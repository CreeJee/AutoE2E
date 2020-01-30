import { Task, MutationAddTaskArgs, MutationRemoveTaskArgs, Scalars, MutationResolvers } from '../generatedType/graphql.ts'

const resolvers: MutationResolvers<Object> = {
    addTask (child, args: MutationAddTaskArgs, context, info): Task {

    },
    removeTask (child, args, context, info): Scalars['Boolean'] {
        child
    }
}
export default resolvers
