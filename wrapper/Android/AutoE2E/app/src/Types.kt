package wrapper.Android.AutoE2E.app.src





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
    val user: String? = null
)
data class MutationDeleteProjectArgs(
    val user: String? = null,
    val projectID: String? = null
)
data class MutationAddTaskArgs(
    val projectID: String? = null,
    val task: TaskInputInput? = null
)
data class MutationRemoveTaskArgs(
    val projectID: String? = null,
    val taskID: String? = null
)
data class MutationRunTaskArgs(
    val projectID: String? = null,
    val taskID: String? = null
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

data class QueryProjectsArgs(
    val user: String? = null
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



data class TaskInputInput(
    val name: String,
    val nodeId: String,
    val param: Iterable<String>
)