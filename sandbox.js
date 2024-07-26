document.addEventListener('DOMContentLoaded', function() {
    let selectedComponent = null;
    const components = document.querySelectorAll('.component');
    const workspace = document.getElementById('workspace');
    const connectionCanvas = document.getElementById('connection-canvas');
    const ctx = connectionCanvas.getContext('2d');
    const propertiesForm = document.getElementById('properties-form');
    let selectedWorkspaceComponent = null;
    let componentsInWorkspace = [];
  
    function resizeCanvas() {
      connectionCanvas.width = workspace.offsetWidth;
      connectionCanvas.height = workspace.offsetHeight;
    }
  
    function drawConnections() {
      ctx.clearRect(0, 0, connectionCanvas.width, connectionCanvas.height);
      if (componentsInWorkspace.length > 1) {
        ctx.beginPath();
        for (let i = 0; i < componentsInWorkspace.length - 1; i++) {
          const startComponent = componentsInWorkspace[i];
          const endComponent = componentsInWorkspace[i + 1];
          const startX = startComponent.offsetLeft + startComponent.offsetWidth / 2;
          const startY = startComponent.offsetTop + startComponent.offsetHeight / 2;
          const endX = endComponent.offsetLeft + endComponent.offsetWidth / 2;
          const endY = endComponent.offsetTop + endComponent.offsetHeight / 2;
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
        }
        ctx.stroke();
      }
    }
  
    components.forEach(component => {
      component.addEventListener('dragstart', function(event) {
        selectedComponent = event.target;
        event.dataTransfer.setData('text/plain', '');
      });
    });
  
    workspace.addEventListener('dragover', function(event) {
      event.preventDefault();
    });
  
    workspace.addEventListener('drop', function(event) {
      event.preventDefault();
      if (selectedComponent) {
        const newComponent = selectedComponent.cloneNode(true);
        newComponent.classList.add('workspace-component');
        newComponent.style.position = 'absolute';
        newComponent.style.left = `${event.offsetX}px`;
        newComponent.style.top = `${event.offsetY}px`;
        newComponent.setAttribute('data-value', '');
        workspace.appendChild(newComponent);
        componentsInWorkspace.push(newComponent);
        drawConnections();
        selectedComponent = null;
      }
    });
  
    workspace.addEventListener('click', function(event) {
      if (event.target.classList.contains('workspace-component')) {
        selectedWorkspaceComponent = event.target;
        const value = selectedWorkspaceComponent.getAttribute('data-value');
        propertiesForm.value = value || '';
      }
    });
  
    propertiesForm.addEventListener('input', function(event) {
      if (selectedWorkspaceComponent) {
        const newValue = event.target.value;
        selectedWorkspaceComponent.setAttribute('data-value', newValue);
        selectedWorkspaceComponent.textContent = `${selectedWorkspaceComponent.textContent.split(' ')[0]} ${newValue}`;
      }
    });
  
    document.getElementById('save').addEventListener('click', function() {
      // Logic to save the current project state
      // You might want to send data to the server or store it locally
      alert('Project saved!');
    });
  
    document.getElementById('back-to-menu').addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
  });
  