---
title: Contacto - Simeza Art
description: Envía un mensaje al equipo de Simeza Art.
keywords: simeza, contacto, pavy beloyu, elucian moise
source_hash: 09f2dd6a270b49d8a5755b3f870e444e12f725603ce0eed35e05337b3d7adf9c
---
<div class="contact-page-overlay">
  <section class="contact-page-dialog" role="dialog" aria-modal="true" aria-labelledby="contactTitle">
    <button type="button" class="contact-page-close" id="closeContactBtn" aria-label="Cerrar">&times;</button>
    <h1 id="contactTitle">Contacto</h1>
    <p id="contactRecipient" class="contact-recipient"></p>
    <form id="contactForm">
      <div class="contact-field">
        <label for="contactName">Nombre</label>
        <input id="contactName" name="name" type="text" autocomplete="name" required>
      </div>
      <div class="contact-field">
        <label for="contactPhone">Número de teléfono</label>
        <input id="contactPhone" name="phone" type="tel" autocomplete="tel">
      </div>
      <div class="contact-field">
        <label for="contactSubject">Asunto</label>
        <input id="contactSubject" name="subject" type="text" value="Mensaje de contacto de Simeza" required>
      </div>
      <div class="contact-field contact-message-field">
        <label for="contactMessage">Mensaje</label>
        <textarea id="contactMessage" name="message" rows="8" required></textarea>
      </div>
      <p id="contactError" class="contact-error" role="alert" hidden></p>
      <div class="contact-page-actions">
        <button type="button" id="closeContactAction" class="contact-close-action">Cerrar</button>
        <button type="button" id="newContactBtn" class="contact-new-action">Nuevo</button>
        <button type="submit" class="contact-send-action"><i class="bi bi-envelope" aria-hidden="true"></i><span>Enviar</span></button>
      </div>
    </form>
  </section>
</div>