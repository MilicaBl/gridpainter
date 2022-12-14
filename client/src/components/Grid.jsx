export function Grid({ color, onClick, border = true }) {
  return (
    <div className="grid grid-cols-[repeat(15,_1fr)] grid-rows-[repeat(15,_1fr)] h-full">
      {[...Array(15).keys()].map((x) => (
        <div key={x} className="w-full h-full">
          {[...Array(15).keys()].map((y) => (
            <div
              key={y}
              onClick={() => onClick(x, y)}
              className={`h-full hover:shadow-cell transition hover:z-20 z-10 relative hover:transition-none ${border ? "border border-sky-300" : ""}`}
              style={{
                backgroundColor: color[y][x],
                borderTopLeftRadius: y === 0 && x === 0 && 11,
                borderTopRightRadius: y === 0 && x === 14 && 11,
                borderBottomLeftRadius: y === 14 && x === 0 && 11,
                borderBottomRightRadius: y === 14 && x === 14 && 11,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
