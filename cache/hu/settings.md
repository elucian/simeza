---
title: Beállítások - Simeza Art
description: Szabja személyre élményét a Simeza művészeti galériában.
keywords: simeza, beállítások, konfiguráció
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
---
# Beállítások

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Bezárás">&times;</button>
    <h3 class="filter-modal-title">Beállítások</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Hurok késleltetése (másodperc)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Automatikus forgatás</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Be</label>
            <label><input type="radio" name="autoRotation" value="false"> Ki</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Asztali elrendezés</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Asztali elrendezés">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Panelek</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Csúszka</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Zene</label>
          <div class="radio-group" role="radiogroup" aria-label="Zene">
            <label><input type="radio" name="musicEnabled" value="true"> Be</label>
            <label><input type="radio" name="musicEnabled" value="false"> Ki</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Megosztható link</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Másolás</button>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Mégse</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Alkalmaz</button>
    </div>
  </div>
</div>