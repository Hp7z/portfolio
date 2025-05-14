// Полностью очищаем все предыдущие эффекты глитча
window.addEventListener("DOMContentLoaded", function() {
  // Удаляем все предыдущие обработчики
  if (window._glitchHandlers) {
    window._glitchHandlers.forEach(handler => {
      document.removeEventListener("mousemove", handler);
    });
  }
  
  // Очищаем текст
  const glitchText = document.querySelector(".glitch-text");
  if (glitchText) {
    glitchText.innerHTML = "MAXIM&nbsp;LUZAN";
    glitchText.setAttribute("data-text", "MAXIM LUZAN");
  }
  
  // Создаем новый обработчик
  const mouseMoveHandler = function(e) {
    if (!glitchText) return;
    
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    const textRect = glitchText.getBoundingClientRect();
    const textCenterX = textRect.left + textRect.width / 2;
    const textCenterY = textRect.top + textRect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(mouseX - textCenterX, 2) + 
      Math.pow(mouseY - textCenterY, 2)
    );
    
    const maxDistance = 200;
    
    if (distance < maxDistance) {
      glitchText.classList.add("active");
    } else {
      glitchText.classList.remove("active");
    }
  };
  
  // Добавляем новый обработчик
  document.addEventListener("mousemove", mouseMoveHandler);
  window._glitchHandlers = [mouseMoveHandler];
});
