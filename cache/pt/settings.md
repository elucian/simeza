---
title: Configurações - Simeza Art
description: Personalize a sua experiência na galeria de arte Simeza.
keywords: simeza, definições, configuração
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Configurações

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Atraso do loop (segundos)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Rotação automática</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> Ligado</label>
          <label><input type="radio" name="autoRotation" value="false"> Desligado</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Barra visível</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Sim</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Não</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Aplicar</button>
    <button type="button" id="cancelSettingsBtn">Cancelar</button>
  </div>
</div>