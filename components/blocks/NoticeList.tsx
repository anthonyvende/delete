type Notice = {
  title: string;
  copy: string;
};

export function NoticeList({ items }: { items: Notice[] }) {
  return (
    <section
      data-block="notice-list"
      className="notice-list container"
      data-reveal-target
      data-reveal="pending"
    >
      {items.map((item) => (
        <article className="notice-list__item" key={item.title}>
          <h3>{item.title}</h3>
          <p>{item.copy}</p>
        </article>
      ))}
    </section>
  );
}
