document.addEventListener('DOMContentLoaded', function() {
    let selectedComponent = null;
    const components = document.querySelectorAll('.component');
    const workspace = document.getElementById('workspace');
    const connectionCanvas = document.getElementById('connection-canvas');
    const ctx = connectionCanvas.getContext('2d');
    const propertiesForm = document.getElementById('properties-form');
    const projectsContainer = document.getElementById('projects-container');
    const saveButton = document.getElementById('save');
    const backButton = document.getElementById('back-to-menu');
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
  
          // Calculate positions of components
          const startX = startComponent.offsetLeft + startComponent.offsetWidth / 2;
          const startY = startComponent.offsetTop + startComponent.offsetHeight / 2;
          const endX = endComponent.offsetLeft + endComponent.offsetWidth / 2;
          const endY = endComponent.offsetTop + endComponent.offsetHeight / 2;
  
          // Draw the line
          ctx.moveTo(startX, startY);
          ctx.lineTo(endX, endY);
        }
        ctx.stroke();
      }
    }
  
    function loadProjects() {
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projectsContainer.innerHTML = '';
      projects.forEach((project, index) => {
        const li = document.createElement('li');
        li.textContent = `Project ${index + 1}`;
        li.addEventListener('click', () => loadProject(project));
        projectsContainer.appendChild(li);
      });
    }
  
    function loadProject(project) {
      workspace.innerHTML = '';
      componentsInWorkspace = [];
      project.forEach(component => {
        const newComponent = document.createElement('div');
        newComponent.classList.add('workspace-component');
        newComponent.style.position = 'absolute';
        newComponent.style.left = `${component.left}px`;
        newComponent.style.top = `${component.top}px`;
        newComponent.setAttribute('data-value', component.value);
        newComponent.textContent = `${component.type} ${component.value}`;
        workspace.appendChild(newComponent);
        componentsInWorkspace.push(newComponent);
      });
      drawConnections();
    }
  
    function saveProject() {
      const project = componentsInWorkspace.map(component => ({
        type: component.textContent.split(' ')[0],
        value: component.getAttribute('data-value'),
        left: component.offsetLeft,
        top: component.offsetTop
      }));
      const projects = JSON.parse(localStorage.getItem('projects')) || [];
      projects.push(project);
      localStorage.setItem('projects', JSON.stringify(projects));
      loadProjects();
      alert('Project saved!');
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
        drawConnections(); // Redraw connections when properties change
      }
    });
  
    saveButton.addEventListener('click', saveProject);
  
    backButton.addEventListener('click', function() {
      window.location.href = 'index.html';
    });
  
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    loadProjects();
  });
  