---
title: Ajustes - Simeza Art
description: Personaliza tu experiencia en la galería de arte Simeza.
keywords: simeza, ajustes, configuración
source_hash: 5a2e97477083d46752167bad97fc11acaeeb9a551e81681d589415200035a64b
---
# Ajustes

<div id="settingsModal" class="gallery-modal-overlay active">
  <div class="gallery-modal gallery-filter-modal settings-modal">
    <button class="gallery-modal-close-x" onclick="window.history.back()" aria-label="Cerrar">&times;</button>
    <h3 class="filter-modal-title">Ajustes</h3>
    <div class="filter-modal-body">
      <form id="settingsForm">
        <div class="settings-group">
          <label>Retraso de bucle (segundos)</label>
          <select name="loopDelay">
            <option value="3">3</option>
            <option value="5">5</option>
            <option value="8">8</option>
            <option value="12">12</option>
          </select>
        </div>
        <div class="settings-group">
          <label>Rotación automática</label>
          <div class="radio-group">
            <label><input type="radio" name="autoRotation" value="true"> Encendido</label>
            <label><input type="radio" name="autoRotation" value="false"> Apagado</label>
          </div>
        </div>
        <div class="settings-group">
          <label>Diseño de escritorio</label>
          <div class="layout-choice-group" role="radiogroup" aria-label="Diseño de escritorio">
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="panels">
              <i class="bi bi-grid" aria-hidden="true"></i>
              <span>Paneles</span>
            </label>
            <label class="layout-choice">
              <input type="radio" name="desktopLayout" value="slider">
              <i class="bi bi-view-stacked" aria-hidden="true"></i>
              <span>Deslizador</span>
            </label>
          </div>
        </div>
        <div class="settings-group">
          <label>Música</label>
          <div class="radio-group" role="radiogroup" aria-label="Música">
            <label><input type="radio" name="musicEnabled" value="true"> Encendido</label>
            <label><input type="radio" name="musicEnabled" value="false"> Apagado</label>
          </div>
        </div>
        <div class="settings-group settings-share-group">
          <label for="settingsShareLink">Enlace para compartir</label>
          <div class="settings-share-control">
            <input id="settingsShareLink" type="url" readonly>
            <button type="button" id="copySettingsLinkBtn">Copiar</button>
          </div>
        </div>
      </form>
    </div>
    <div class="gallery-modal-footer filter-modal-footer">
      <button type="button" class="gallery-modal-btn-close filter-reset-btn" id="cancelSettingsBtn">Cancelar</button>
      <button type="button" class="gallery-modal-btn-close" id="applySettingsBtn">Aplicar</button>
    </div>
  </div>
</div>