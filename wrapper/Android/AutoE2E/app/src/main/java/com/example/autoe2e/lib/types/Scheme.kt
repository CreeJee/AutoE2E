package com.example.autoe2e.lib.types



enum class LogType(val label: String) {
      Info("INFO"),
      Warn("WARN"),
      Danger("DANGER");

  companion object {
    @JvmStatic
    fun valueOfLabel(label: String): LogType? {
      return values().find { it.label == label }
    }
  }
}

data class MutationCreateProjectArgs(
    val name: String? = null
)
data class MutationDeleteProjectArgs(
    val name: String? = null
)
data class MutationInsertGroupArgs(
    val project: String? = null,
    val group: String? = null
)
data class MutationRemoveGroupArgs(
    val project: String? = null,
    val group: String? = null
)
data class MutationInsertTaskArgs(
    val project: String? = null,
    val group: String? = null,
    val task: TaskInfoInput? = null
)
data class MutationRemoveTaskArgs(
    val project: String? = null,
    val group: String? = null,
    val nth: Int? = null
)
data class MutationRunTaskArgs(
    val project: String? = null,
    val group: String? = null
)



enum class Property(val label: String) {
      Width("width"),
      Height("height");

  companion object {
    @JvmStatic
    fun valueOfLabel(label: String): Property? {
      return values().find { it.label == label }
    }
  }
}

data class QueryProjectArgs(
    val id: String? = null
)



enum class TagEnum(val label: String) {
      Success("SUCCESS"),
      Warn("WARN"),
      TestError("TEST_ERROR"),
      UnknownErr("UNKNOWN_ERR");

  companion object {
    @JvmStatic
    fun valueOfLabel(label: String): TagEnum? {
      return values().find { it.label == label }
    }
  }
}





data class TaskInfoInput(
    val name: TaskJob,
    val nodeUid: Int,
    val param: ArrayList<String>
)

enum class TaskJob(val label: String) {
      Focus("focus"),
      FocusOut("focusOut"),
      Click("click"),
      DoubleClick("doubleClick"),
      MouseEnter("mouseEnter"),
      MouseLeave("mouseLeave"),
      Resize("resize"),
      Zoom("zoom"),
      KeyDown("keyDown"),
      KeyUp("keyUp"),
      KeyPress("keyPress");

  companion object {
    @JvmStatic
    fun valueOfLabel(label: String): TaskJob? {
      return values().find { it.label == label }
    }
  }
}