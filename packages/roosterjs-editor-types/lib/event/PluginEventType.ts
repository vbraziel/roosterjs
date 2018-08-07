/**
 * Editor plugin event type
 */
const enum PluginEventType {
    /**
     * HTML KeyDown event
     */
    KeyDown = 0,

    /**
     * HTML KeyPress event
     */
    KeyPress = 1,

    /**
     * HTML KeyUp event
     */
    KeyUp = 2,

    /**
     * HTML CompositionEnd event
     */
    CompositionEnd = 3,

    /**
     * HTML MouseDown event
     */
    MouseDown = 4,

    /**
     * HTML MouseUp event
     */
    MouseUp = 5,

    /**
     * Content changed event
     */
    ContentChanged = 6,

    /**
     * Extract Content event
     * This event is triggered when getContent() is called with triggerExtractContentEvent = true
     * Plugin can handle this event to remove the UI only markups to return clean HTML
     */
    ExtractContent = 7,

    /**
     * Before Paste event, provide a chance to change paste content
     */
    BeforePaste = 8,

    /**
     * Let plugin know editor is ready now
     */
    EditorReady = 10,

    /**
     * Let plugin know editor is about to dispose
     */
    BeforeDispose = 11,
}

export default PluginEventType;
