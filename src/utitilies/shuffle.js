const shuffle = () => {
  const assets = [
    { image: "/assets/abby.png" },
    { image: "/assets/jules.png" },
    { image: "/assets/rainiel.png" },
    { image: "/assets/nina.png" },
    { image: "/assets/lester.png" },
    { image: "/assets/kyle.png" },
    { image: "/assets/gen.png" },
    { image: "/assets/gelo.png" },
  ];
  return [...assets, ...assets]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id: Math.random() }));
};

export default shuffle;
