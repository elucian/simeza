---
title: Ajustes - Simeza Art
description: Personaliza tu experiencia en la galería de arte Simeza.
keywords: simeza, ajustes, configuración
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Ajustes

<div class="settings-dialog">
  <div class="settings-left">
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
        <label>Barra visible</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Sí</label>
          <label><input type="radio" name="pillbarVisible" value="false"> No</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Aplicar</button>
    <button type="button" id="cancelSettingsBtn">Cancelar</button>
  </div>
</div>