---
title: Setări - Simeza Art
description: Personalizați-vă experiența pe galeria de artă Simeza.
keywords: simeza, setări, configurare
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
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
          <label>Bară vizibilă</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Da</label>
            <label><input type="radio" name="pillbarVisible" value="false"> Nu</label>
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