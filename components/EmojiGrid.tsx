'use client';
const EMOJI = ['😀','😇','😍','😎','🤩','🥳','🤠','😺','🐼','🐻','🐶','🦊','🐵','🦄','🐯','🐷','🐸','🐙','🌸','🌻','🌼','🍀','🍁','🍉','🍰','☕️','🎨','🎵','🎬','⚽️','🏀','🏓','🚀','✈️','🧩','💡','✨','🔥','❤️','💜','💙','🤍'];

export default function EmojiGrid({ value, onPick }: { value?: string; onPick: (e: string)=>void }) {
  return (
    <div className="grid grid-cols-10 gap-2 max-h-40 overflow-auto p-2 bg-white rounded-xl border">
      {EMOJI.map((e) => (
        <button key={e} className={`rounded-lg p-2 text-xl ${value===e?'bg-mist ring-1 ring-ink/20':''}`} onClick={() => onPick(e)}>{e}</button>
      ))}
    </div>
  );
}
