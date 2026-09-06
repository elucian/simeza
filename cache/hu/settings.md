---
title: Beállítások - Simeza Art
description: Szabja testre élményét a Simeza művészeti galériában.
keywords: simeza, beállítások, konfiguráció
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
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
          <label>Sáv láthatósága</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Igen</label>
            <label><input type="radio" name="pillbarVisible" value="false"> Nem</label>
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