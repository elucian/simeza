---
title: Настройки - Simeza Art
description: Настройте свой опыт работы с художественной галереей Simeza.
keywords: simeza, настройки, конфигурация
source_hash: fb17cab6b13cf2a09b64f5a84dc888b7e05feef663c53ca3fa843d6faf20b1bc
---
# Настройки

<div class="settings-dialog">
  <div class="settings-left">
    <form id="settingsForm">
      <div class="settings-group">
        <label>Задержка цикла (секунды)</label>
        <select name="loopDelay">
          <option value="3">3</option>
          <option value="5">5</option>
          <option value="8">8</option>
          <option value="12">12</option>
        </select>
      </div>
      <div class="settings-group">
        <label>Автоповорот</label>
        <div class="radio-group">
          <label><input type="radio" name="autoRotation" value="true"> Вкл</label>
          <label><input type="radio" name="autoRotation" value="false"> Выкл</label>
        </div>
      </div>
      <div class="settings-group">
        <label>Видимость панели</label>
        <div class="radio-group">
          <label><input type="radio" name="pillbarVisible" value="true"> Да</label>
          <label><input type="radio" name="pillbarVisible" value="false"> Нет</label>
        </div>
      </div>
    </form>
  </div>
  <div class="settings-right">
    <button type="button" id="applySettingsBtn">Применить</button>
    <button type="button" id="cancelSettingsBtn">Отмена</button>
  </div>
</div>