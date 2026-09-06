---
title: Contact - Simeza Art
description: Send a message to the Simeza Art team.
keywords: simeza, contact, pavy beloyu, elucian moise
---

<div class="contact-page-overlay">
  <section class="contact-page-dialog" role="dialog" aria-modal="true" aria-labelledby="contactTitle">
    <button type="button" class="contact-page-close" id="closeContactBtn" aria-label="Close">&times;</button>
    <h1 id="contactTitle">Contact</h1>
    <form id="contactForm">
      <div class="contact-field">
        <label for="contactName">Name</label>
        <input id="contactName" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="contact-field">
        <label for="contactEmail">E-mail Address</label>
        <input id="contactEmail" name="email" type="email" autocomplete="email" required>
      </div>
      <div class="contact-field">
        <label for="contactPhone">Phone Number</label>
        <input id="contactPhone" name="phone" type="tel" autocomplete="tel">
      </div>
      <div class="contact-field">
        <label for="contactSubject">Subject</label>
        <input id="contactSubject" name="subject" type="text" required>
      </div>
      <div class="contact-field contact-message-field">
        <label for="contactMessage">Message</label>
        <textarea id="contactMessage" name="message" rows="8" required></textarea>
      </div>
      <p id="contactError" class="contact-error" role="alert" hidden></p>
      <div class="contact-page-actions">
        <button type="button" id="closeContactAction" class="contact-close-action">Close</button>
        <button type="submit" class="contact-send-action">Send</button>
      </div>
    </form>
  </section>
</div>