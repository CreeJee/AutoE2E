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

export type DocumentNode = {
   __typename?: 'DocumentNode',
  uid: Scalars['ID'],
  name: Scalars['String'],
  children: Array<DocumentNode>,
};

/** service type */
export type Item = {
   __typename?: 'Item',
  uid: Scalars['ID'],
  name: Scalars['String'],
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
  addTask?: Maybe<Task>,
  removeTask?: Maybe<Scalars['Boolean']>,
  runTask?: Maybe<Project>,
};


export type MutationCreateProjectArgs = {
  user?: Maybe<Scalars['ID']>
};


export type MutationDeleteProjectArgs = {
  user?: Maybe<Scalars['ID']>,
  projectID?: Maybe<Scalars['ID']>
};


export type MutationAddTaskArgs = {
  projectID?: Maybe<Scalars['ID']>,
  task?: Maybe<TaskInput>
};


export type MutationRemoveTaskArgs = {
  projectID?: Maybe<Scalars['ID']>,
  taskID?: Maybe<Scalars['ID']>
};


export type MutationRunTaskArgs = {
  projectID?: Maybe<Scalars['ID']>,
  taskID?: Maybe<Scalars['ID']>
};

/** atomic */
export type Node = {
  uid: Scalars['ID'],
  name: Scalars['String'],
};

/** mapping */
export type Project = {
   __typename?: 'Project',
  id?: Maybe<Scalars['ID']>,
  tag?: Maybe<Tag>,
  Window?: Maybe<DocumentNode>,
  Tasks: Array<Task>,
};

export enum Property {
  Width = 'width',
  Height = 'height'
}

/** RootType */
export type Query = {
   __typename?: 'Query',
  Projects: Array<Project>,
};


/** RootType */
export type QueryProjectsArgs = {
  user?: Maybe<Scalars['ID']>
};

export type Tag = {
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
  uid: Scalars['ID'],
  name: Scalars['String'],
  current: DocumentNode,
  param: Array<Scalars['String']>,
};

export type TaskInput = {
  name: Scalars['String'],
  nodeId: Scalars['ID'],
  param: Array<Scalars['String']>,
};




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
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Project: ResolverTypeWrapper<Project>,
  Tag: ResolverTypeWrapper<Tag>,
  LogType: LogType,
  String: ResolverTypeWrapper<Scalars['String']>,
  DocumentNode: ResolverTypeWrapper<DocumentNode>,
  Task: ResolverTypeWrapper<Task>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  TaskInput: TaskInput,
  Property: Property,
  TagEnum: TagEnum,
  Node: ResolverTypeWrapper<Node>,
  Log: ResolverTypeWrapper<Log>,
  Item: ResolverTypeWrapper<Item>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  ID: Scalars['ID'],
  Project: Project,
  Tag: Tag,
  LogType: LogType,
  String: Scalars['String'],
  DocumentNode: DocumentNode,
  Task: Task,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  TaskInput: TaskInput,
  Property: Property,
  TagEnum: TagEnum,
  Node: Node,
  Log: Log,
  Item: Item,
};

export type DocumentNodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['DocumentNode'] = ResolversParentTypes['DocumentNode']> = {
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  children?: Resolver<Array<ResolversTypes['DocumentNode']>, ParentType, ContextType>,
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type LogResolvers<ContextType = any, ParentType extends ResolversParentTypes['Log'] = ResolversParentTypes['Log']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['LogType'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createProject?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, MutationCreateProjectArgs>,
  deleteProject?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationDeleteProjectArgs>,
  addTask?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType, MutationAddTaskArgs>,
  removeTask?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, MutationRemoveTaskArgs>,
  runTask?: Resolver<Maybe<ResolversTypes['Project']>, ParentType, ContextType, MutationRunTaskArgs>,
};

export type NodeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<null, ParentType, ContextType>,
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type ProjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['Project'] = ResolversParentTypes['Project']> = {
  id?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType>,
  tag?: Resolver<Maybe<ResolversTypes['Tag']>, ParentType, ContextType>,
  Window?: Resolver<Maybe<ResolversTypes['DocumentNode']>, ParentType, ContextType>,
  Tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  Projects?: Resolver<Array<ResolversTypes['Project']>, ParentType, ContextType, QueryProjectsArgs>,
};

export type TagResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tag'] = ResolversParentTypes['Tag']> = {
  type?: Resolver<ResolversTypes['LogType'], ParentType, ContextType>,
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  uid?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  current?: Resolver<ResolversTypes['DocumentNode'], ParentType, ContextType>,
  param?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  DocumentNode?: DocumentNodeResolvers<ContextType>,
  Item?: ItemResolvers<ContextType>,
  Log?: LogResolvers,
  Mutation?: MutationResolvers<ContextType>,
  Node?: NodeResolvers,
  Project?: ProjectResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Tag?: TagResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
