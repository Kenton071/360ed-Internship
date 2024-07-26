document.addEventListener('DOMContentLoaded', function() {
  let selectedComponent = null;

  const components = document.querySelectorAll('.component');
  const workspace = document.getElementById('workspace');
  const introScreen = document.getElementById('intro-screen');
  const circuitWorkspace = document.getElementById('circuit-workspace');
  const startButton = document.getElementById('start-button');
  const introVideo = document.getElementById('intro-video');

  startButton.addEventListener('click', function() {
    introScreen.classList.add('hidden');
    circuitWorkspace.classList.remove('hidden');
  });

  introVideo.addEventListener('ended', function() {
    introScreen.classList.add('hidden');
    circuitWorkspace.classList.remove('hidden');
  });

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
      workspace.appendChild(newComponent);
      selectedComponent = null;
    }
  });

  const propertiesForm = document.getElementById('properties-form');
  let selectedWorkspaceComponent = null;

  workspace.addEventListener('click', function(event) {
    if (event.target.classList.contains('workspace-component')) {
      selectedWorkspaceComponent = event.target;
      const value = selectedWorkspaceComponent.getAttribute('data-value');
      propertiesForm.value.value = value || '';
    }
  });

  propertiesForm.addEventListener('input', function(event) {
    if (selectedWorkspaceComponent) {
      selectedWorkspaceComponent.setAttribute('data-value', event.target.value);
    }
  });

  document.getElementById('submit').addEventListener('click', function() {
    const components = document.querySelectorAll('#workspace .workspace-component');
    let isValidCircuit = true;

    components.forEach(component => {
      const value = component.getAttribute('data-value');
      if (!value || value.trim() === '') {
        isValidCircuit = false;
      }
    });

    if (isValidCircuit) {
      alert('Congratulations! You have successfully created the circuit.');
      window.location.href = 'post-submission.html';
    } else {
      alert('Please ensure all components have their values set.');
    }
  });
});
