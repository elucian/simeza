---
title: Paramètres - Simeza Art
description: Personnalisez votre expérience sur la galerie d'art Simeza.
keywords: simeza, paramètres, configuration
source_hash: 602559a295172c5338d9ba4f6f01cca7d38355476106bbc2bad64730609b5503
---
# Paramètres

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Fermer">&times;</button>
    <h3 class="filter-modal-title">Paramètres</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Délai de boucle (secondes)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Rotation automatique</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Activé</label>
            <label><input type="radio" name="autoRotation" value="false"> Désactivé</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Barre visible</label>
          <div class="radio-group">
            <label><input type="radio" name="pillbarVisible" value="true"> Oui</label>
            <label><input type="radio" name="pillbarVisible" value="false"> Non</label>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Annuler</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Appliquer</button>
    </div>
  </div>
</div>