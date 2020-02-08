import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type DocumentNode = Node & {
   __typename?: 'DocumentNode',
  name: Scalars['String'],
  children: Array<DocumentNode>,
  uid: Scalars['Int'],
};

export type Log = {
  type: LogType,
  message: Scalars['String'],
};

export enum LogType {
  Info = 'INFO',
  Warn = 'WARN',
  Danger = 'DANGER'
}

export type Mutation = {
   __typename?: 'Mutation',
  createProject?: Maybe<Project>,
  deleteProject?: Maybe<Scalars['Boolean']>,
  insertGroup?: Maybe<TaskGroup>,
  removeGroup?: Maybe<Scalars['Boolean']>,
  insertTask?: Maybe<Task>,
  removeTask?: Maybe<Scalars['Boolean']>,
  runTask?: Maybe<DocumentNode>,
};


export type MutationCreateProjectArgs = {
  name?: Maybe<Scalars['ID']>
};


export type MutationDeleteProjectArgs = {
  name?: Maybe<Scalars['ID']>
};


export type MutationInsertGroupArgs = {
  project?: Maybe<Scalars['ID']>,
  group?: Maybe<Scalars['ID']>
};


export type MutationRemoveGroupArgs = {
  project?: Maybe<Scalars['ID']>,
  group?: Maybe<Scalars['ID']>
};


export type MutationInsertTaskArgs = {
  project?: Maybe<Scalars['ID']>,
  group?: Maybe<Scalars['ID']>,
  task?: Maybe<TaskInfo>
};


export type MutationRemoveTaskArgs = {
  project?: Maybe<Scalars['ID']>,
  group?: Maybe<Scalars['ID']>,
  nth?: Maybe<Scalars['Int']>
};


export type MutationRunTaskArgs = {
  project?: Maybe<Scalars['ID']>,
  group?: Maybe<Scalars['ID']>
};

/** atomic */
export type Node = {
  name: Scalars['String'],
};

export type Project = Node & {
   __typename?: 'Project',
  name: Scalars['String'],
  window?: Maybe<DocumentNode>,
  tags: Array<Tag>,
  taskGroup: Array<TaskGroup>,
};

export enum Property {
  Width = 'width',
  Height = 'height'
}

/** RootType */
export type Query = {
   __typename?: 'Query',
  projects: Array<Project>,
  project?: Maybe<Project>,
};


/** RootType */
export type QueryProjectArgs = {
  id?: Maybe<Scalars['ID']>
};

/** 
 * todo extends all interface
 * service type
 */
export type Tag = Log & {
   __typename?: 'Tag',
  type: LogType,
  message: Scalars['String'],
};

export enum TagEnum {
  Success = 'SUCCESS',
  Warn = 'WARN',
  TestError = 'TEST_ERROR',
  UnknownErr = 'UNKNOWN_ERR'
}

export type Task = {
   __typename?: 'Task',
  index?: Maybe<Scalars['Int']>,
  name: TaskJob,
  param: Array<Scalars['String']>,
  current: DocumentNode,
};

export type TaskGroup = Node & {
   __typename?: 'TaskGroup',
  name: Scalars['String'],
  tasks: Array<Task>,
};

export type TaskInfo = {
  name: TaskJob,
  nodeUid: Scalars['Int'],
  param: Array<Scalars['String']>,
};

export enum TaskJob {
  Focus = 'focus',
  FocusOut = 'focusOut',
  Click = 'click',
  DoubleClick = 'doubleClick',
  MouseEnter = 'mouseEnter',
  MouseLeave = 'mouseLeave',
  Resize = 'resize',
  Zoom = 'zoom',
  KeyDown = 'keyDown',
  KeyUp = 'keyUp',
  KeyPress = 'keyPress'
}




export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Project: ResolverTypeWrapper<Project>,
  Node: ResolverTypeWrapper<Node>,
  String: ResolverTypeWrapper<Scalars['String']>,
  DocumentNode: ResolverTypeWrapper<DocumentNode>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Tag: ResolverTypeWrapper<Tag>,
  Log: ResolverTypeWrapper<Log>,
  LogType: LogType,
  TaskGroup: ResolverTypeWrapper<TaskGroup>,
  Task: ResolverTypeWrapper<Task>,
  TaskJob: TaskJob,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  TaskInfo: TaskInfo,
  Property: Property,
  TagEnum: TagEnum,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Project: Project,
  Node: Node,
  String: Scalars['String'],
  DocumentNode: DocumentNode,
  Int: Scalars['Int'],
  Tag: Tag,
  Log: Log,
  LogType: LogType,
  TaskGroup: TaskGroup,
  Task: Task,
  TaskJob: TaskJob,
  ID: Scalars['ID'],
  Mutation: {},
  Boolean: Scalars['Boolean'],
  TaskInfo: TaskInfo,
  Property: Property,
  TagEnum: TagEnum,
};

export type DocumentNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentNode'] = ResolversParentTypes['DocumentNode']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  children?: Resolver<Array<ResolversTypes['DocumentNode']>, ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
};

export type LogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = {
  __resolveType: TypeResolveFn<'Tag', ParentType, ContextType>,
  type?: Resolver<ResolversTypes['LogType'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, MutationCreateProjectArgs>,
  deleteProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationDeleteProjectArgs>,
  insertGroup?: Resolver<Maybe<ResolversTypes['TaskGroup']>, ParentType, ContextType, MutationInsertGroupArgs>,
  removeGroup?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationRemoveGroupArgs>,
  insertTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, MutationInsertTaskArgs>,
  removeTask?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationRemoveTaskArgs>,
  runTask?: Resolver<Maybe<ResolversTypes['DocumentNode']>, ParentType, ContextType, MutationRunTaskArgs>,
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Project' | 'DocumentNode' | 'TaskGroup', ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  window?: Resolver<Maybe<ResolversTypes['DocumentNode']>, ParentType, ContextType>,
  tags?: Resolver<Array<ResolversTypes['Tag']>, ParentType, ContextType>,
  taskGroup?: Resolver<Array<ResolversTypes['TaskGroup']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType>,
  project?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, QueryProjectArgs>,
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  type?: Resolver<ResolversTypes['LogType'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  index?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  name?: Resolver<ResolversTypes['TaskJob'], ParentType, ContextType>,
  param?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
  current?: Resolver<ResolversTypes['DocumentNode'], ParentType, ContextType>,
};

export type TaskGroupResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskGroup'] = ResolversParentTypes['TaskGroup']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  DocumentNode?: DocumentNodeResolvers<ContextType>,
  Log?: LogResolvers,
  Mutation?: MutationResolvers<ContextType>,
  Node?: NodeResolvers,
  Project?: ProjectResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TaskGroup?: TaskGroupResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
