import Editor from 'react-simple-code-editor'
import Prism from 'prismjs'

export default function CodeWindow({
  value,
}: {
  value: { code: string; language: string }
}) {
  const { code, language } = value
  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-buttons">
          <div className="title-button" />
          <div className="title-button" />
          <div className="title-button" />
        </div>
      </div>
      <div className="editor_wrap">
        <Editor
          value={code}
          onValueChange={() => {
            return
          }}
          highlight={(c) =>
            Prism.highlight(c, Prism.languages[language], language)
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
          }}
        />
      </div>
    </div>
  )
}
