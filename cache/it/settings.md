---
title: Impostazioni - Simeza Art
description: Personalizza la tua esperienza nella galleria d'arte Simeza.
keywords: simeza, impostazioni, configurazione
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
---
# Impostazioni

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Chiudi">&times;</button>
    <h3 class="filter-modal-title">Impostazioni</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Ritardo loop (secondi)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Rotazione automatica</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Acceso</label>
            <label><input type="radio" name="autoRotation" value="false"> Spento</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Barra visibile</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Sì</label>
            <label><input type="radio" name="pillbarVisible" value="false"> No</label>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Annulla</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Applica</button>
    </div>
  </div>
</div>