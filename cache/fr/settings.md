---
title: Paramètres - Simeza Art
description: Personnalisez votre expérience sur la galerie d'art Simeza.
keywords: simeza, paramètres, configuration
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
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
          <label>Mise en page bureau</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Mise en page bureau">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Panneaux</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Curseur</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Musique</label>
          <div class="radio-group" role="radiogroup" aria-label="Musique">
            <label><input type="radio" name="musicEnabled" value="true"> Activé</label>
            <label><input type="radio" name="musicEnabled" value="false"> Désactivé</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Lien partageable</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Copier</button>
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