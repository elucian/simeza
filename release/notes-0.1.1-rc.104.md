# Release Notes: 0.1.1-rc.104

- **Release Date**: 2026-09-06 15:36:07
- **Current Commit**: `eb588034e954e822d2775d5b6c916b9db5b32a65`
- **Previous Commit**: `509ab59b51e36fee8465c61b5bb023a3eeb3e624`

## Summary of Commits
```text
eb58803 Commit: Sun, Sep  6, 2026  3:36:02 PM
a8576fa Build candidate: Sun, Sep  6, 2026  1:37:25 PM
12c6361 Build candidate: Sun, Sep  6, 2026  1:11:50 PM
79ea3e9 Build candidate: Sun, Sep  6, 2026  1:02:54 PM
30451e4 Build candidate: Sun, Sep  6, 2026  1:01:45 PM
327d3ad Build candidate: Sun, Sep  6, 2026  1:01:29 PM
7d1545c Build candidate: Sun, Sep  6, 2026 12:56:30 PM
513d8bf Build candidate: Sun, Sep  6, 2026 12:33:38 PM
8b3cf8a Build candidate: Sun, Sep  6, 2026 11:58:15 AM
126bbeb Build candidate: Sun, Sep  6, 2026 11:46:21 AM
f6a919e Build candidate: Sun, Sep  6, 2026 11:10:15 AM
80a0a31 Build candidate: Sun, Sep  6, 2026  9:04:09 AM
48aefb2 Build candidate: Sun, Sep  6, 2026  7:25:40 AM
72e9608 Build candidate: Sun, Sep  6, 2026  7:19:43 AM
adb45fa Build candidate: Sun, Sep  6, 2026  6:57:39 AM
930ae12 Build candidate: Sat, Sep  5, 2026  6:42:47 PM
69cc04b Build candidate: Sat, Sep  5, 2026  6:35:46 PM
2aa7a77 Commit: Sat, Sep  5, 2026  6:16:54 PM
c0782f4 chore: exclude /content/garbage and /content/archive from version control
aef741b Build candidate: Sat, Sep  5, 2026  5:56:01 PM
ab8ca86 Commit: Sat, Sep  5, 2026  5:55:56 PM
aeaba60 Build candidate: Sat, Sep  5, 2026  5:40:22 PM
d77c773 Commit: Sat, Sep  5, 2026  5:29:12 PM
618bf79 Commit: Sat, Sep  5, 2026 11:35:48 AM
2c1deeb Build candidate: Sat, Sep  5, 2026 10:41:04 AM
cf26dd1 Build candidate: Sat, Sep  5, 2026  9:50:43 AM
460c3f9 Publish release: v0.1.1-rc.84
```

## Affected Files
```text
.gitignore
build_fixed.py
cache/de/autoren.md
cache/de/buecher.md
cache/de/index.md
cache/de/media.md
cache/de/menu.json
cache/de/schriften.md
cache/de/settings.md
cache/de/toolbar.json
cache/de/ueber-uns.md
cache/es/autores.md
cache/es/escritos.md
cache/es/index.md
cache/es/libros.md
cache/es/media.md
cache/es/menu.json
cache/es/settings.md
cache/es/sobre-nosotros.md
cache/es/toolbar.json
cache/fr/a-propos.md
cache/fr/auteurs.md
cache/fr/ecrits.md
cache/fr/index.md
cache/fr/livres.md
cache/fr/media.md
cache/fr/menu.json
cache/fr/settings.md
cache/fr/toolbar.json
cache/hu/galeria.md
cache/hu/index.md
cache/hu/irasok.md
cache/hu/konyvek.md
cache/hu/media.md
cache/hu/menu.json
cache/hu/rolunk.md
cache/hu/settings.md
cache/hu/szerzok.md
cache/hu/toolbar.json
cache/it/autori.md
cache/it/chi-siamo.md
cache/it/index.md
cache/it/libri.md
cache/it/media.md
cache/it/menu.json
cache/it/scritti.md
cache/it/settings.md
cache/it/toolbar.json
cache/pt/autores.md
cache/pt/escritos.md
cache/pt/galeria.md
cache/pt/index.md
cache/pt/livros.md
cache/pt/media.md
cache/pt/menu.json
cache/pt/settings.md
cache/pt/sobre.md
cache/pt/toolbar.json
cache/ro/autori.md
cache/ro/carti.md
cache/ro/despre.md
cache/ro/galerie.md
cache/ro/index.md
cache/ro/media.md
cache/ro/menu.json
cache/ro/scrieri.md
cache/ro/settings.md
cache/ro/toolbar.json
cache/ru/avtory.md
cache/ru/index.md
cache/ru/knigi.md
cache/ru/media.md
cache/ru/menu.json
cache/ru/o-nas.md
cache/ru/settings.md
cache/ru/stati.md
cache/ru/toolbar.json
content/archive/arta.html
content/archive/carti.html
content/archive/interview.html
content/archive/matematica.html
content/archive/poezie.html
content/archive/scrieri.html
content/archive/spiritualitate.html
content/authors/author-1.json
content/authors/authors.json
content/authors/cornilescu.jpg
content/authors/ioanid.jpg
content/authors/self-portrait-eluchn.jpg
content/authors/self-portrait-eluchn.json
content/authors/self-portrait-eluchn.webp
content/authors/self-portrait-pavy.json
content/authors/self-portrait-pavy.webp
content/books/ 14 iulie 40.pdf
content/books/1 September 40.pdf
content/books/11 August 40.pdf
content/books/13 Oktober 40.pdf
content/books/18 August 40.pdf
"content/books/20 Oktober 40-ultima predic\304\203.pdf"
content/books/20 Oktober 40.pdf
content/books/21 iulie 40.pdf
content/books/22 September 40.pdf
content/books/25 August 40.pdf
content/books/28. Juli 40.pdf
content/books/29 September 40.pdf
content/books/51e1Ng-iGgL.jpg
content/books/6 Oktober 40.pdf
content/books/8 September  40 II Text.pdf
content/books/8 September 40.pdf
content/books/BLM si invazia kitch in muzeele americane.pdf
content/books/Costache Ioanid Poezii.pdf
"content/books/Decadent\314\246a Artei.pdf"
"content/books/Isus-Temelia-Vie\310\233ii.jpg"
content/books/Masurile.pdf
content/books/Poliedrele.pdf
content/books/Spira mirabilis.pdf
content/books/album.jpg
content/books/alexandru-donici.jpg
content/books/amintiri.jpg
"content/books/asem\304\203narea.pdf"
"content/books/cine-e\310\231ti-tu.jpg"
content/books/derivata.pdf
content/books/eben ezer-legea inductiei.pdf
content/books/garden-of-eden.jpg
content/books/geometry-conics.jpg
content/books/geometry-history.jpg
content/books/gradina-eden.jpg
content/books/istoria-logaritmilor.jpg
content/books/iustina_popescu.jpg
content/books/logaritmi.jpg
content/books/logaritmi.pdf
content/books/pentagonul.pdf
content/books/picturi-muscel.jpg
content/books/poezii_ioanid.jpg
"content/books/prefa\310\233\304\203.pdf"
content/books/reforma-cover.jpg
content/books/reforma-muscel.jpg
content/books/scrieri-cover.jpg
content/books/sub-cruce-cover.jpg
content/books/sub-cruce-traduceri.jpg
content/books/sub-cruce.jpg
content/gallery/aby-6-ani.json
content/gallery/aby-6-ani.webp
content/gallery/aby-cu-fundita.json
content/gallery/aby-cu-fundita.webp
content/gallery/ana.json
content/gallery/ana.webp
content/gallery/anemone.json
content/gallery/anemone.webp
content/gallery/anita.json
content/gallery/anita.webp
content/gallery/athos-mountain.json
content/gallery/athos-mountain.webp
content/gallery/barci-la-soare.webp
content/gallery/beach-pe-101-n.json
content/gallery/beach-pe-101-n.webp
content/gallery/berny.json
content/gallery/berny.webp
content/gallery/bianca.json
content/gallery/bianca.webp
content/gallery/bianca1.json
content/gallery/bianca1.webp
content/gallery/bibi.json
content/gallery/bibi.webp
content/gallery/buchet.json
content/gallery/buchet.webp
content/gallery/bujori.json
content/gallery/bujori.webp
content/gallery/bunicul.json
content/gallery/bunicul.webp
content/gallery/capite.json
content/gallery/capite.webp
content/gallery/carmel-1.json
content/gallery/carmel-1.webp
content/gallery/casa-parintilor-1.json
content/gallery/casa-parintilor-1.webp
content/gallery/casa-parintilor-2.json
content/gallery/casa-parintilor-2.webp
content/gallery/catalina-island.json
content/gallery/catalina-island.webp
content/gallery/cisnadioara.json
content/gallery/cisnadioara.webp
content/gallery/crater-lake.json
content/gallery/crater-lake.webp
content/gallery/crizanteme-cu-squash.json
content/gallery/crizanteme-cu-squash.webp
content/gallery/crizanteme.json
content/gallery/crizanteme.webp
content/gallery/delta-1.json
content/gallery/delta-1.webp
content/gallery/delta-2.json
content/gallery/delta-2.webp
content/gallery/edy.json
content/gallery/edy.webp
content/gallery/floarea-soarelui.json
content/gallery/floarea-soarelui.webp
content/gallery/flori-cu-tartacute.json
content/gallery/flori-cu-tartacute.webp
content/gallery/flori-cu-umbrela.json
content/gallery/flori-cu-umbrela.webp
content/gallery/flori-cu-vas.json
content/gallery/flori-cu-vas.webp
content/gallery/flori-cu-vioara.json
content/gallery/flori-cu-vioara.webp
content/gallery/flori-de-camp-cu-vas.json
content/gallery/flori-de-camp-cu-vas.webp
content/gallery/flori-galbene-cu-stergar.json
content/gallery/flori-galbene-cu-stergar.webp
content/gallery/flori-in-cos.json
content/gallery/flori-in-cos.webp
content/gallery/flori-pastel.json
content/gallery/flori-pastel.webp
content/gallery/flori-pe-masa.json
content/gallery/flori-pe-masa.webp
content/gallery/flori.json
content/gallery/flori.webp
content/gallery/garoafe-cu-vas-galben.json
content/gallery/garoafe-cu-vas-galben.webp
content/gallery/georgel.json
content/gallery/georgel.webp
content/gallery/girl-at-the-beach.json
content/gallery/girl-at-the-beach.webp
content/gallery/greece-beach.json
content/gallery/greece-beach.webp
content/gallery/iarna-blanda-in-gradina.json
content/gallery/iarna-blanda-in-gradina.webp
content/gallery/joshua-trees.json
content/gallery/joshua-trees.webp
content/gallery/la-fantana.json
content/gallery/la-fantana.webp
content/gallery/la-tara.json
content/gallery/la-tara.webp
content/gallery/laguna-beach.json
content/gallery/laguna-beach.webp
content/gallery/lalele.json
content/gallery/lalele.webp
content/gallery/liliac.json
content/gallery/liliac.webp
content/gallery/liniste-pe-lac.json
content/gallery/liniste-pe-lac.webp
content/gallery/luminis-1.json
content/gallery/luminis-1.webp
content/gallery/luminis.json
content/gallery/luminis.webp
content/gallery/mama.json
content/gallery/mama.webp
content/gallery/marea-neagra.json
content/gallery/marea-neagra.webp
content/gallery/merisor.json
content/gallery/merisor.webp
content/gallery/mesteceni-1.json
content/gallery/mesteceni-1.webp
content/gallery/mesteceni-3.json
content/gallery/mesteceni-3.webp
content/gallery/michelsberg-cetatea.json
content/gallery/michelsberg-cetatea.webp
content/gallery/michelsberg.json
content/gallery/michelsberg.webp
content/gallery/midland-mi.json
content/gallery/midland-mi.webp
content/gallery/miki-cu-fructe.json
content/gallery/miki-cu-fructe.webp
content/gallery/miki-mireasa.json
content/gallery/miki-mireasa.webp
content/gallery/miki-palm-springs.json
content/gallery/miki-palm-springs.webp
content/gallery/miki-sanguina.json
content/gallery/miki-sanguina.webp
content/gallery/miki1.json
content/gallery/miki1.webp
content/gallery/miki2.json
content/gallery/miki2.webp
content/gallery/mona.json
content/gallery/mona.webp
"content/gallery/n\304\203m\304\203ie\310\231ti.json"
"content/gallery/n\304\203m\304\203ie\310\231ti.webp"
content/gallery/pacific-grove.json
content/gallery/pacific-grove.webp
content/gallery/pe-masa.json
content/gallery/pe-masa.webp
content/gallery/pe-valea-dambovitei.json
content/gallery/pe-valea-dambovitei.webp
content/gallery/pe-valuri.json
content/gallery/pe-valuri.webp
content/gallery/pescarita.json
content/gallery/pescarita.webp
content/gallery/petrona.json
content/gallery/petrona.webp
content/gallery/poiana-in-mi.json
content/gallery/poiana-in-mi.webp
content/gallery/point-loma.json
content/gallery/point-loma.webp
content/gallery/prima-pictura.json
content/gallery/prima-pictura.webp
content/gallery/roze-galbene.json
content/gallery/roze-galbene.webp
content/gallery/roze-pe-fond-inchis.json
content/gallery/roze-pe-fond-inchis.webp
content/gallery/san-juan-capistrano1.json
content/gallery/san-juan-capistrano1.webp
content/gallery/satic.json
content/gallery/satic.webp
content/gallery/self-portrait-1989.json
content/gallery/self-portrait-1989.webp
content/gallery/self-portrait-2.json
content/gallery/self-portrait-2.webp
content/gallery/self-portrait-2005.json
content/gallery/self-portrait-5.json
content/gallery/self-portrait-5.webp
content/gallery/self-portrait-6.json
content/gallery/self-portrait-6.webp
content/gallery/simfonie-in-albastru.json
content/gallery/simfonie-in-albastru.webp
content/gallery/squash-cu-stergar.json
content/gallery/squash-cu-stergar.webp
content/gallery/stergar-cu-flori-galbene.json
content/gallery/stergar-cu-flori-galbene.webp
content/gallery/tata.json
content/gallery/tata.webp
content/gallery/towsley-canyon.json
content/gallery/towsley-canyon.webp
content/gallery/trandafiri.json
content/gallery/trandafiri.webp
content/gallery/trump.json
content/gallery/trump.webp
content/gallery/tufanele.json
content/gallery/tufanele.webp
content/gallery/vas-alb-cu-garoafe-rosii.json
content/gallery/vas-alb-cu-garoafe-rosii.webp
content/gallery/ventura-2.json
content/gallery/ventura-2.webp
content/garbage/aby-6-ani.json
content/garbage/aby-cu-fundita.json
content/garbage/ana.json
content/garbage/anemone.json
content/garbage/anita.json
content/garbage/athos-mountain.json
content/garbage/beach-pe-101-n.json
content/garbage/berny.json
content/garbage/bianca.json
content/garbage/bianca1.json
content/garbage/bibi.json
content/garbage/buchet.json
content/garbage/bujori.json
content/garbage/bunicul.json
content/garbage/capite.json
content/garbage/carmel-1.json
content/garbage/casa-parintilor-1.json
content/garbage/casa-parintilor-2.json
content/garbage/catalina-island.json
content/garbage/cisnadioara.json
content/garbage/crater-lake.json
content/garbage/crizanteme-cu-squash.json
content/garbage/crizanteme.json
content/garbage/delta-1.json
content/garbage/delta-2.json
content/garbage/edy.json
content/garbage/floarea-soarelui.json
content/garbage/flori-cu-tartacute.json
content/garbage/flori-cu-umbrela.json
content/garbage/flori-cu-vas.json
content/garbage/flori-cu-vioara.json
content/garbage/flori-de-camp-cu-vas.json
content/garbage/flori-galbene-cu-stergar.json
content/garbage/flori-in-cos.json
content/garbage/flori-pastel.json
content/garbage/flori-pe-masa.json
content/garbage/flori.json
content/garbage/garoafe-cu-vas-galben.json
content/garbage/georgel.json
content/garbage/girl-at-the-beach.json
content/garbage/greece-beach.json
content/garbage/iarna-blanda-in-gradina.json
content/garbage/joshua-trees.json
content/garbage/la-fantana.json
content/garbage/la-tara.json
content/garbage/laguna-beach.json
content/garbage/lalele.json
content/garbage/liliac.json
content/garbage/liniste-pe-lac.json
content/garbage/luminis-1.json
content/garbage/luminis.json
content/garbage/mama.json
content/garbage/marea-neagra.json
content/garbage/merisor.json
content/garbage/mesteceni-3.json
content/garbage/michelsberg-cetatea.json
content/garbage/michelsberg.json
content/garbage/midland-mi.json
content/garbage/miki-cu-fructe.json
content/garbage/miki-mireasa.json
content/garbage/miki-palm-springs.json
content/garbage/miki-sanguina.json
content/garbage/miki1.json
content/garbage/miki2.json
content/garbage/mona.json
"content/garbage/n\304\203m\304\203ie\310\231ti.json"
content/garbage/pacific-grove.json
content/garbage/pe-masa.json
content/garbage/pe-valea-dambovitei.json
content/garbage/pe-valuri.json
content/garbage/pescarita.json
content/garbage/petrona.json
content/garbage/poiana-in-mi.json
content/garbage/point-loma.json
content/garbage/prima-pictura.json
content/garbage/roze-galbene.json
content/garbage/roze-pe-fond-inchis.json
content/garbage/san-juan-capistrano1.json
content/garbage/satic.json
content/garbage/self-portrait-1989.json
content/garbage/self-portrait-2.json
content/garbage/self-portrait-2005.json
content/garbage/self-portrait-2005.webp
content/garbage/self-portrait-5.json
content/garbage/self-portrait-6.json
content/garbage/simfonie-in-albastru.json
content/garbage/squash-cu-stergar.json
content/garbage/stergar-cu-flori-galbene.json
content/garbage/tata.json
content/garbage/towsley-canyon.json
content/garbage/trandafiri.json
content/garbage/trump.json
content/garbage/tufanele.json
content/garbage/vas-alb-cu-garoafe-rosii.json
content/garbage/ventura-2.json
content/media/event-1.json
content/media/media-1.json
content/media/media-1.webp
content/media/media-2.json
content/media/media-2.webp
content/media/media-3.json
content/media/media-3.webp
content/music/13m-Ambient-NatureSoundscape-120bpm-GMajor.mp3
content/music/3m-Blues-ChicagoBlues-120bpm-FMajor.mp3
content/music/3m-Jazz-CoolJazz-120bpm-CMajor.mp3
content/music/3m-Oriental-JapaneseFolk-120bpm-GMajor.mp3
content/music/3m-Spanish-Guitar-120bpm-CMajor.mp3
content/music/3m-Western-Bluegrass-120bpm-EMajor (1).mp3
content/music/3m-Western-Bluegrass-120bpm-EMajor.mp3
content/writings/3 Tate din Satic.pdf
content/writings/Adunari de munte si biserici din America.pdf
content/writings/Bunicul Lucan.pdf
content/writings/Cameron.pdf
"content/writings/Din c\304\203lug\304\203r la c\303\242rcium\304\203.pdf"
"content/writings/M\303\242na mamei.pdf"
content/writings/drumul calvarului.pdf
core/css/about.css
core/css/content-panel.css
core/css/filter-modal.css
core/css/filter.css
core/css/gallery.css
core/css/icons.css
core/css/index.css
core/css/media.css
core/css/reset.css
core/css/settings.css
core/css/slyder.css
core/css/style.css
core/img/icons/arrow-repeat.svg
core/img/icons/book.svg
core/img/icons/broadcast.svg
core/img/icons/camera-video.svg
core/img/icons/camera.svg
core/img/icons/chat-left-text.svg
core/img/icons/discord.svg
core/img/icons/download.svg
core/img/icons/facebook.svg
core/img/icons/funnel-fill.svg
core/img/icons/funnel.svg
core/img/icons/gear.svg
core/img/icons/google.svg
core/img/icons/grid.svg
core/img/icons/layout-sidebar-reverse.svg
core/img/icons/lightbulb.svg
core/img/icons/list.svg
core/img/icons/megaphone.svg
core/img/icons/mortarboard.svg
core/img/icons/palette.svg
core/img/icons/pen.svg
core/img/icons/pencil-square.svg
core/img/icons/pencil.svg
core/img/icons/people.svg
core/img/icons/person.svg
core/img/icons/play-btn.svg
core/img/icons/reddit.svg
core/img/icons/share.svg
core/img/icons/soundwave.svg
core/img/icons/stop-fill.svg
core/img/icons/translate.svg
core/img/icons/view-stacked.svg
core/img/icons/whatsapp.svg
core/js/about.js
core/js/content-panel.js
core/js/filter.js
core/js/gallery.js
core/js/gallery.js.bak
core/js/media.js
core/js/settings.js
core/js/simeza.js
layout/menu.json
layout/template.html
layout/toolbar.json
pages/about.md
pages/authors.md
pages/books.md
pages/filter.md
pages/media.md
pages/settings.md
pages/share.md
pages/writings.md
release/notes-0.1.1-rc.84.md
release/release.log
release/releases.json
script/build.py
script/salvage_archive.py
script/translate.py
slug_map.py
slug_map.txt
```
