export const TRICKS = [
    { keys: ['ctrl', 'up'], name: 'Kickflip' },
    { keys: ['alt', 'down'], name: 'Heelflip' },
    { keys: ['ctrl', 'left', 'down'], name: '360 Spin' },
    { keys: ['alt', 'right', 'up'], name: 'Method Air' },
    { keys: ['ctrl', 'right'], name: 'Indy Grab' },
    { keys: ['alt', 'left'], name: 'Nosegrab' },
    { keys: ['ctrl', 'up', 'left'], name: 'Stalefish' },
    { keys: ['alt', 'up', 'right'], name: 'Tailgrab' },
    { keys: ['ctrl', 'down', 'right'], name: 'Japan Air' },
    { keys: ['alt', 'down', 'left'], name: 'Melon' }
];

export function checkTrick(controls) {
    const pressed = [];
    if (controls.ctrl) pressed.push('ctrl');
    if (controls.alt) pressed.push('alt');
    if (controls.up) pressed.push('up');
    if (controls.down) pressed.push('down');
    if (controls.left) pressed.push('left');
    if (controls.right) pressed.push('right');
    if (pressed.length < 2) return null;
    const found = TRICKS.find(t => t.keys.length === pressed.length && t.keys.every(k => pressed.includes(k)));
    return found ? found.name : null;
}
