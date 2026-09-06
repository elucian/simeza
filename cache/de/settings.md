---
title: Einstellungen - Simeza Art
description: Personalisieren Sie Ihr Erlebnis in der Simeza Kunstgalerie.
keywords: Simeza, Einstellungen, Konfiguration
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
---
# Einstellungen

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Schließen">&times;</button>
    <h3 class="filter-modal-title">Einstellungen</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Schleifenverzögerung (Sekunden)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Automatische Rotation</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> An</label>
            <label><input type="radio" name="autoRotation" value="false"> Aus</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Desktop-Layout</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Desktop-Layout">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Panels</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Slider</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Musik</label>
          <div class="radio-group" role="radiogroup" aria-label="Musik">
            <label><input type="radio" name="musicEnabled" value="true"> An</label>
            <label><input type="radio" name="musicEnabled" value="false"> Aus</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Freigabelink</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Kopieren</button>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Abbrechen</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Anwenden</button>
    </div>
  </div>
</div>