export const configHoverDropdownAnimation = (hoverName) => ({
  opacity: hoverName ? 1 : 0,
  transform: hoverName ? 'translateY(0)' : 'translateY(-20px)',
  config: { tension: 200, friction: 20 },
  delay: 100,
});
