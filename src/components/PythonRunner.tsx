import { useState, useEffect } from 'react';

interface PythonRunnerProps {
  initialCode?: string;
}

const GRID_SIZE = 10

export default function PythonRunner({ initialCode = '' }: PythonRunnerProps) {
  const [code, setCode] = useState(initialCode);

  // 等待 Brython 載入完成
  useEffect(() => {
    return () => {
      window.removeEventListener('load', () => { });
    };
  }, []);


  const runPython = () => {

    console.log(
      executePython(`arr_hit = [[0] * ${GRID_SIZE} for _ in range(${GRID_SIZE})]
def paint(x, y):
  if y < ${GRID_SIZE} and x < ${GRID_SIZE}:
    arr_hit[y][x] = 1
`+ code)
    )
  };

  // Ctrl + Enter 快捷鍵
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      runPython();
    }
  };

  return (
    <div style={{
      fontFamily: 'system-ui, sans-serif',
      maxWidth: '900px', margin: '0 auto', padding: '1.5rem',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}>


      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={runPython}
          style={{
            padding: '8px 16px',
            background: '#238636',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            marginRight: '12px',
            cursor: 'pointer',
          }}
        >
          執行 (Ctrl + Enter)
        </button>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="在此輸入 Python 程式碼..."
        style={{
          height: '180px',
          fontFamily: 'Consolas, monospace',
          background: '#1e1e1e',
          color: '#e6edf3',
          border: '1px solid #444',
          borderRadius: '6px',
          resize: 'vertical',
          fontSize: '15px',
          marginBottom: '1rem',
          padding: 10,
        }}
      />

    </div>
  );
}