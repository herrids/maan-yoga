import "./Poses.scss"

const images = Object.values(import.meta.glob('/public/poses/*.svg'))
  .map(image => image.name.match(/([^/]*)(?=\.\w+$)/)[1]);

export default function() { 

    const onDragStart = (event, name) => {
      event.dataTransfer.setData("name", name);
    };

    return (
      <div className="poses-grid">
        {images.map((key, i) => (
          <img
            key={i}
            src={`poses/${key}.svg`}
            draggable
            onDragStart={(event) => onDragStart(event, key)}
          />
        ))}
      </div>
    );
  }