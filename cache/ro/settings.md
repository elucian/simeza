---
title: Setări - Simeza Art
description: Personalizează-ți experiența pe galeria de artă Simeza.
keywords: simeza, setări, configurare
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
---
# Setări

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Închide">&times;</button>
    <h3 class="filter-modal-title">Setări</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Întârziere buclă (secunde)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Rotație automată</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Pornit</label>
            <label><input type="radio" name="autoRotation" value="false"> Oprit</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Aspect desktop</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Aspect desktop">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Panouri</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Glisor</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Muzică</label>
          <div class="radio-group" role="radiogroup" aria-label="Muzică">
            <label><input type="radio" name="musicEnabled" value="true"> Pornit</label>
            <label><input type="radio" name="musicEnabled" value="false"> Oprit</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Link partajabil</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Copiază</button>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Anulează</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Aplică</button>
    </div>
  </div>
</div>