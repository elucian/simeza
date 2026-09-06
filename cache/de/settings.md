---
title: Einstellungen - Simeza Art
description: Personalisieren Sie Ihr Erlebnis in der Simeza Kunstgalerie.
keywords: Simeza, Einstellungen, Konfiguration
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
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
          <label>Pillbar sichtbar</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Ja</label>
            <label><input type="radio" name="pillbarVisible" value="false"> Nein</label>
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