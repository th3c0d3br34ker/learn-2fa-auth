const PinInput = ({ id, name, inputRef }) => {
  const handleKeyDown = (event) => {
    const keyValue = event.key;

    if (!/^\d+$/.test(keyValue)) {
      event.preventDefault();
    }
    if (event.key === 'Backspace') {
      // Backspace key was pressed
      event.currentTarget.value = '';

      // Input field is empty, move focus to previous input field
      event.preventDefault();
      const prevInput = event.currentTarget.previousElementSibling;
      if (prevInput) {
        prevInput.focus();
      }
    }
  };
};

export default PinInput;
