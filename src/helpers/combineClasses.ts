function combineClasses(...classes: (string | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export default combineClasses;
