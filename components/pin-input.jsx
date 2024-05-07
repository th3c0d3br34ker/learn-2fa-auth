'use client';

const PinInput = ({ id, name, key }) => {
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

  const handleInput = (event) => {
    const input = event.currentTarget;
    if (input.selectionEnd === input.value.length) {
      // Input field is full, move focus to next input field
      const nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <input
      key={key}
      type='text'
      className='w-12 h-12 m-2 text-center text-2xl font-bold text-gray-900 bg-gray-100 border-2 border-gray-300 rounded-md shadow-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200'
      id={id}
      name={name}
      maxLength='1'
      onKeyDown={handleKeyDown}
      onInput={handleInput}
      required
    />
  );
};

export default PinInput;
