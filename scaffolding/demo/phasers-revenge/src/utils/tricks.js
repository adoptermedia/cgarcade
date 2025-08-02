// Trick combinations now rely on the kick button instead of Ctrl / Alt
export const TRICKS = [
    { keys: ['kick', 'up'], name: 'Kickflip' },
    { keys: ['kick', 'down'], name: 'Heelflip' },
    { keys: ['kick', 'left', 'down'], name: '360 Spin' },
    { keys: ['kick', 'right', 'up'], name: 'Method Air' },
    { keys: ['kick', 'right'], name: 'Indy Grab' },
    { keys: ['kick', 'left'], name: 'Nosegrab' },
    { keys: ['kick', 'up', 'left'], name: 'Stalefish' },
    { keys: ['kick', 'up', 'right'], name: 'Tailgrab' },
    { keys: ['kick', 'down', 'right'], name: 'Japan Air' },
    { keys: ['kick', 'down', 'left'], name: 'Melon' }
];

export function checkTrick(controls) {
    const pressed = [];
    if (controls.kick) pressed.push('kick');
    if (controls.up) pressed.push('up');
    if (controls.down) pressed.push('down');
    if (controls.left) pressed.push('left');
    if (controls.right) pressed.push('right');
    if (pressed.length < 2) return null;
    const found = TRICKS.find(t => t.keys.length === pressed.length && t.keys.every(k => pressed.includes(k)));
    return found ? found.name : null;
}
