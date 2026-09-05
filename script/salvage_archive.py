import json
import os
import re
from html.parser import HTMLParser

# Config
ARCHIVE_DIR = 'content/archive'
BOOKS_DIR = 'content/books'
WRITINGS_DIR = 'content/writings'

def sanitize_id(title):
    return re.sub(r'[^a-z0-9-]', '-', title.lower()).strip('-')

class BookParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.books = []
        self.current_book = None
        self.in_card = False
        self.tag_stack = []

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag == 'div' and ('class', 'col-lg-6 col-12 card') in attrs:
            self.in_card = True
            self.current_book = {'content': {'en': {}}}
        elif self.in_card and tag == 'img':
            attrs_dict = dict(attrs)
            self.current_book['file'] = attrs_dict.get('src', '').split('/')[-1]
        elif self.in_card and tag == 'a':
            attrs_dict = dict(attrs)
            self.current_book['link'] = attrs_dict.get('href')

    def handle_data(self, data):
        if self.in_card:
            if self.tag_stack[-1] == 'h4':
                self.current_book['content']['en']['title'] = data.strip()
            elif self.tag_stack[-1] == 'p':
                self.current_book['content']['en']['description'] = (self.current_book['content']['en'].get('description', '') + ' ' + data.strip()).strip()

    def handle_endtag(self, tag):
        self.tag_stack.pop()
        if tag == 'div' and self.in_card:
            if 'title' in self.current_book['content']['en']:
                self.current_book['id'] = sanitize_id(self.current_book['content']['en']['title'])
                self.books.append(self.current_book)
            self.in_card = False
            self.current_book = None

class WritingParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.writings = []
        self.current_writing = None
        self.in_li = False
        self.tag_stack = []

    def handle_starttag(self, tag, attrs):
        self.tag_stack.append(tag)
        if tag == 'li':
            self.in_li = True
            self.current_writing = {'content': {'en': {}}}
        elif self.in_li and tag == 'a':
            attrs_dict = dict(attrs)
            self.current_writing['link'] = attrs_dict.get('href')

    def handle_data(self, data):
        if self.in_li:
            if self.tag_stack[-1] == 'a':
                self.current_writing['content']['en']['title'] = data.strip()
            elif self.tag_stack[-1] == 'p':
                self.current_writing['content']['en']['description'] = data.strip()

    def handle_endtag(self, tag):
        self.tag_stack.pop()
        if tag == 'li':
            if 'title' in self.current_writing['content']['en']:
                self.current_writing['id'] = sanitize_id(self.current_writing['content']['en']['title'])
                self.writings.append(self.current_writing)
            self.in_li = False
            self.current_writing = None

def salvage():
    if not os.path.exists(BOOKS_DIR): os.makedirs(BOOKS_DIR)
    if not os.path.exists(WRITINGS_DIR): os.makedirs(WRITINGS_DIR)
    
    with open(os.path.join(ARCHIVE_DIR, 'carti.html'), 'r', encoding='utf-8') as f:
        parser = BookParser()
        parser.feed(f.read())
        for book in parser.books:
            with open(os.path.join(BOOKS_DIR, f"{book['id']}.json"), 'w', encoding='utf-8') as f:
                json.dump(book, f, indent=2, ensure_ascii=False)
            print(f"Salvaged book: {book['id']}")

    with open(os.path.join(ARCHIVE_DIR, 'scrieri.html'), 'r', encoding='utf-8') as f:
        parser = WritingParser()
        parser.feed(f.read())
        for writing in parser.writings:
            with open(os.path.join(WRITINGS_DIR, f"{writing['id']}.json"), 'w', encoding='utf-8') as f:
                json.dump(writing, f, indent=2, ensure_ascii=False)
            print(f"Salvaged writing: {writing['id']}")

if __name__ == '__main__':
    salvage()
