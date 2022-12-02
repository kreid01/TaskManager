import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  bye: Scalars['String'];
  getProject: Projects;
  getProjects: Array<Projects>;
  getProjectTasks: Array<Tasks>;
  getTask: Tasks;
  getTasks: Array<Tasks>;
  getTeamMembers: Array<Users>;
  getUser?: Maybe<Users>;
  getUsersProjects: Array<Projects>;
  getUsersTasks: Array<Tasks>;
  searchProjects: Array<Projects>;
  searchUsers: Array<Users>;
  users: Array<Users>;
};


export type QueryGetProjectArgs = {
  id: Scalars['Float'];
};


export type QueryGetProjectTasksArgs = {
  id: Scalars['Float'];
};


export type QueryGetTaskArgs = {
  id: Scalars['Float'];
};


export type QueryGetTeamMembersArgs = {
  team: Scalars['String'];
};


export type QueryGetUsersProjectsArgs = {
  id: Scalars['Float'];
};


export type QueryGetUsersTasksArgs = {
  id: Scalars['Float'];
};


export type QuerySearchProjectsArgs = {
  search: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  search: Scalars['String'];
};

export type Projects = {
  __typename?: 'Projects';
  created: Scalars['String'];
  id: Scalars['Int'];
  members: Scalars['String'];
  projectLead: Scalars['Int'];
  projectName: Scalars['String'];
};

export type Tasks = {
  __typename?: 'Tasks';
  completeDate: Scalars['String'];
  created: Scalars['String'];
  creator: Scalars['Int'];
  id: Scalars['Int'];
  isComplete: Scalars['Boolean'];
  members: Scalars['String'];
  projectId: Scalars['Int'];
  taskName: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  email: Scalars['String'];
  firstName: Scalars['String'];
  id: Scalars['Int'];
  lastName: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject: Scalars['Boolean'];
  createTask: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteTask: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateProjectMembers: Projects;
  updateTask: Tasks;
};


export type MutationCreateProjectArgs = {
  members: Scalars['String'];
  projectLead: Scalars['Float'];
  projectName: Scalars['String'];
};


export type MutationCreateTaskArgs = {
  completeDate: Scalars['String'];
  creator: Scalars['Float'];
  members: Scalars['String'];
  projectId: Scalars['Float'];
  taskName: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTaskArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationRevokeRefreshTokensForUserArgs = {
  userId: Scalars['Int'];
};


export type MutationUpdateProjectMembersArgs = {
  id: Scalars['Float'];
  members: Scalars['String'];
};


export type MutationUpdateTaskArgs = {
  id: Scalars['Float'];
  isComplete: Scalars['Boolean'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: Users;
};

export type CreateProjectMutationVariables = Exact<{
  members: Scalars['String'];
  projectName: Scalars['String'];
  projectLead: Scalars['Float'];
}>;


export type CreateProjectMutation = { __typename?: 'Mutation', createProject: boolean };

export type DeleteProjectMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteProjectMutation = { __typename?: 'Mutation', deleteProject: boolean };

export type GetProjectQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProjectQuery = { __typename?: 'Query', getProject: { __typename?: 'Projects', projectName: string, projectLead: number, members: string } };

export type GetUsersProjectsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUsersProjectsQuery = { __typename?: 'Query', getUsersProjects: Array<{ __typename?: 'Projects', id: number, projectName: string, projectLead: number, created: string, members: string }> };

export type SearchProjectsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchProjectsQuery = { __typename?: 'Query', searchProjects: Array<{ __typename?: 'Projects', projectName: string, id: number }> };

export type UpdateProjectMembersMutationVariables = Exact<{
  members: Scalars['String'];
  id: Scalars['Float'];
}>;


export type UpdateProjectMembersMutation = { __typename?: 'Mutation', updateProjectMembers: { __typename?: 'Projects', members: string } };

export type CreateTaskMutationVariables = Exact<{
  projectId: Scalars['Float'];
  completeDate: Scalars['String'];
  taskName: Scalars['String'];
  creator: Scalars['Float'];
  members: Scalars['String'];
}>;


export type CreateTaskMutation = { __typename?: 'Mutation', createTask: boolean };

export type DeleteTaskMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTaskMutation = { __typename?: 'Mutation', deleteTask: boolean };

export type GetProjectsTasksQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetProjectsTasksQuery = { __typename?: 'Query', getProjectTasks: Array<{ __typename?: 'Tasks', taskName: string, id: number, creator: number, projectId: number, members: string, isComplete: boolean, created: string, completeDate: string }> };

export type GetUsersTasksQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUsersTasksQuery = { __typename?: 'Query', getUsersTasks: Array<{ __typename?: 'Tasks', taskName: string, id: number, creator: number, projectId: number, isComplete: boolean, members: string, created: string, completeDate: string }> };

export type UpdateTaskMutationVariables = Exact<{
  isComplete: Scalars['Boolean'];
  id: Scalars['Float'];
}>;


export type UpdateTaskMutation = { __typename?: 'Mutation', updateTask: { __typename?: 'Tasks', isComplete: boolean } };

export type GetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type GetUserQuery = { __typename?: 'Query', getUser?: { __typename?: 'Users', id: number, email: string, username: string, firstName: string, lastName: string } | null };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'Users', id: number, email: string, username: string, firstName: string, lastName: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: boolean };

export type SearchUsersQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchUsersQuery = { __typename?: 'Query', searchUsers: Array<{ __typename?: 'Users', id: number, firstName: string, lastName: string, username: string, email: string }> };

export type GetTeamMembersQueryVariables = Exact<{
  team: Scalars['String'];
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeamMembers: Array<{ __typename?: 'Users', id: number, firstName: string, lastName: string }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: number }> };


export const CreateProjectDocument = gql`
    mutation createProject($members: String!, $projectName: String!, $projectLead: Float!) {
  createProject(members: $members, projectName: $projectName, projectLead: $projectLead)
}
    `;
export type CreateProjectMutationFn = Apollo.MutationFunction<CreateProjectMutation, CreateProjectMutationVariables>;

/**
 * __useCreateProjectMutation__
 *
 * To run a mutation, you first call `useCreateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProjectMutation, { data, loading, error }] = useCreateProjectMutation({
 *   variables: {
 *      members: // value for 'members'
 *      projectName: // value for 'projectName'
 *      projectLead: // value for 'projectLead'
 *   },
 * });
 */
export function useCreateProjectMutation(baseOptions?: Apollo.MutationHookOptions<CreateProjectMutation, CreateProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument, options);
      }
export type CreateProjectMutationHookResult = ReturnType<typeof useCreateProjectMutation>;
export type CreateProjectMutationResult = Apollo.MutationResult<CreateProjectMutation>;
export type CreateProjectMutationOptions = Apollo.BaseMutationOptions<CreateProjectMutation, CreateProjectMutationVariables>;
export const DeleteProjectDocument = gql`
    mutation deleteProject($id: Float!) {
  deleteProject(id: $id)
}
    `;
export type DeleteProjectMutationFn = Apollo.MutationFunction<DeleteProjectMutation, DeleteProjectMutationVariables>;

/**
 * __useDeleteProjectMutation__
 *
 * To run a mutation, you first call `useDeleteProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProjectMutation, { data, loading, error }] = useDeleteProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteProjectMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProjectMutation, DeleteProjectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument, options);
      }
export type DeleteProjectMutationHookResult = ReturnType<typeof useDeleteProjectMutation>;
export type DeleteProjectMutationResult = Apollo.MutationResult<DeleteProjectMutation>;
export type DeleteProjectMutationOptions = Apollo.BaseMutationOptions<DeleteProjectMutation, DeleteProjectMutationVariables>;
export const GetProjectDocument = gql`
    query getProject($id: Float!) {
  getProject(id: $id) {
    projectName
    projectLead
    members
  }
}
    `;

/**
 * __useGetProjectQuery__
 *
 * To run a query within a React component, call `useGetProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectQuery(baseOptions: Apollo.QueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
      }
export function useGetProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectQuery, GetProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectQuery, GetProjectQueryVariables>(GetProjectDocument, options);
        }
export type GetProjectQueryHookResult = ReturnType<typeof useGetProjectQuery>;
export type GetProjectLazyQueryHookResult = ReturnType<typeof useGetProjectLazyQuery>;
export type GetProjectQueryResult = Apollo.QueryResult<GetProjectQuery, GetProjectQueryVariables>;
export const GetUsersProjectsDocument = gql`
    query getUsersProjects($id: Float!) {
  getUsersProjects(id: $id) {
    id
    projectName
    projectLead
    created
    members
  }
}
    `;

/**
 * __useGetUsersProjectsQuery__
 *
 * To run a query within a React component, call `useGetUsersProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersProjectsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsersProjectsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersProjectsQuery, GetUsersProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersProjectsQuery, GetUsersProjectsQueryVariables>(GetUsersProjectsDocument, options);
      }
export function useGetUsersProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersProjectsQuery, GetUsersProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersProjectsQuery, GetUsersProjectsQueryVariables>(GetUsersProjectsDocument, options);
        }
export type GetUsersProjectsQueryHookResult = ReturnType<typeof useGetUsersProjectsQuery>;
export type GetUsersProjectsLazyQueryHookResult = ReturnType<typeof useGetUsersProjectsLazyQuery>;
export type GetUsersProjectsQueryResult = Apollo.QueryResult<GetUsersProjectsQuery, GetUsersProjectsQueryVariables>;
export const SearchProjectsDocument = gql`
    query searchProjects($search: String!) {
  searchProjects(search: $search) {
    projectName
    id
  }
}
    `;

/**
 * __useSearchProjectsQuery__
 *
 * To run a query within a React component, call `useSearchProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchProjectsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchProjectsQuery(baseOptions: Apollo.QueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
      }
export function useSearchProjectsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchProjectsQuery, SearchProjectsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchProjectsQuery, SearchProjectsQueryVariables>(SearchProjectsDocument, options);
        }
export type SearchProjectsQueryHookResult = ReturnType<typeof useSearchProjectsQuery>;
export type SearchProjectsLazyQueryHookResult = ReturnType<typeof useSearchProjectsLazyQuery>;
export type SearchProjectsQueryResult = Apollo.QueryResult<SearchProjectsQuery, SearchProjectsQueryVariables>;
export const UpdateProjectMembersDocument = gql`
    mutation updateProjectMembers($members: String!, $id: Float!) {
  updateProjectMembers(members: $members, id: $id) {
    members
  }
}
    `;
export type UpdateProjectMembersMutationFn = Apollo.MutationFunction<UpdateProjectMembersMutation, UpdateProjectMembersMutationVariables>;

/**
 * __useUpdateProjectMembersMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMembersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMembersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMembersMutation, { data, loading, error }] = useUpdateProjectMembersMutation({
 *   variables: {
 *      members: // value for 'members'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateProjectMembersMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProjectMembersMutation, UpdateProjectMembersMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProjectMembersMutation, UpdateProjectMembersMutationVariables>(UpdateProjectMembersDocument, options);
      }
export type UpdateProjectMembersMutationHookResult = ReturnType<typeof useUpdateProjectMembersMutation>;
export type UpdateProjectMembersMutationResult = Apollo.MutationResult<UpdateProjectMembersMutation>;
export type UpdateProjectMembersMutationOptions = Apollo.BaseMutationOptions<UpdateProjectMembersMutation, UpdateProjectMembersMutationVariables>;
export const CreateTaskDocument = gql`
    mutation createTask($projectId: Float!, $completeDate: String!, $taskName: String!, $creator: Float!, $members: String!) {
  createTask(projectId: $projectId, completeDate: $completeDate, taskName: $taskName, creator: $creator, members: $members)
}
    `;
export type CreateTaskMutationFn = Apollo.MutationFunction<CreateTaskMutation, CreateTaskMutationVariables>;

/**
 * __useCreateTaskMutation__
 *
 * To run a mutation, you first call `useCreateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTaskMutation, { data, loading, error }] = useCreateTaskMutation({
 *   variables: {
 *      projectId: // value for 'projectId'
 *      completeDate: // value for 'completeDate'
 *      taskName: // value for 'taskName'
 *      creator: // value for 'creator'
 *      members: // value for 'members'
 *   },
 * });
 */
export function useCreateTaskMutation(baseOptions?: Apollo.MutationHookOptions<CreateTaskMutation, CreateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument, options);
      }
export type CreateTaskMutationHookResult = ReturnType<typeof useCreateTaskMutation>;
export type CreateTaskMutationResult = Apollo.MutationResult<CreateTaskMutation>;
export type CreateTaskMutationOptions = Apollo.BaseMutationOptions<CreateTaskMutation, CreateTaskMutationVariables>;
export const DeleteTaskDocument = gql`
    mutation deleteTask($id: Float!) {
  deleteTask(id: $id)
}
    `;
export type DeleteTaskMutationFn = Apollo.MutationFunction<DeleteTaskMutation, DeleteTaskMutationVariables>;

/**
 * __useDeleteTaskMutation__
 *
 * To run a mutation, you first call `useDeleteTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTaskMutation, { data, loading, error }] = useDeleteTaskMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTaskMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTaskMutation, DeleteTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument, options);
      }
export type DeleteTaskMutationHookResult = ReturnType<typeof useDeleteTaskMutation>;
export type DeleteTaskMutationResult = Apollo.MutationResult<DeleteTaskMutation>;
export type DeleteTaskMutationOptions = Apollo.BaseMutationOptions<DeleteTaskMutation, DeleteTaskMutationVariables>;
export const GetProjectsTasksDocument = gql`
    query getProjectsTasks($id: Float!) {
  getProjectTasks(id: $id) {
    taskName
    id
    creator
    projectId
    members
    isComplete
    created
    completeDate
  }
}
    `;

/**
 * __useGetProjectsTasksQuery__
 *
 * To run a query within a React component, call `useGetProjectsTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectsTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectsTasksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetProjectsTasksQuery(baseOptions: Apollo.QueryHookOptions<GetProjectsTasksQuery, GetProjectsTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectsTasksQuery, GetProjectsTasksQueryVariables>(GetProjectsTasksDocument, options);
      }
export function useGetProjectsTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectsTasksQuery, GetProjectsTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectsTasksQuery, GetProjectsTasksQueryVariables>(GetProjectsTasksDocument, options);
        }
export type GetProjectsTasksQueryHookResult = ReturnType<typeof useGetProjectsTasksQuery>;
export type GetProjectsTasksLazyQueryHookResult = ReturnType<typeof useGetProjectsTasksLazyQuery>;
export type GetProjectsTasksQueryResult = Apollo.QueryResult<GetProjectsTasksQuery, GetProjectsTasksQueryVariables>;
export const GetUsersTasksDocument = gql`
    query getUsersTasks($id: Float!) {
  getUsersTasks(id: $id) {
    taskName
    id
    creator
    projectId
    isComplete
    members
    created
    completeDate
  }
}
    `;

/**
 * __useGetUsersTasksQuery__
 *
 * To run a query within a React component, call `useGetUsersTasksQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersTasksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersTasksQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsersTasksQuery(baseOptions: Apollo.QueryHookOptions<GetUsersTasksQuery, GetUsersTasksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersTasksQuery, GetUsersTasksQueryVariables>(GetUsersTasksDocument, options);
      }
export function useGetUsersTasksLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersTasksQuery, GetUsersTasksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersTasksQuery, GetUsersTasksQueryVariables>(GetUsersTasksDocument, options);
        }
export type GetUsersTasksQueryHookResult = ReturnType<typeof useGetUsersTasksQuery>;
export type GetUsersTasksLazyQueryHookResult = ReturnType<typeof useGetUsersTasksLazyQuery>;
export type GetUsersTasksQueryResult = Apollo.QueryResult<GetUsersTasksQuery, GetUsersTasksQueryVariables>;
export const UpdateTaskDocument = gql`
    mutation updateTask($isComplete: Boolean!, $id: Float!) {
  updateTask(isComplete: $isComplete, id: $id) {
    isComplete
  }
}
    `;
export type UpdateTaskMutationFn = Apollo.MutationFunction<UpdateTaskMutation, UpdateTaskMutationVariables>;

/**
 * __useUpdateTaskMutation__
 *
 * To run a mutation, you first call `useUpdateTaskMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTaskMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTaskMutation, { data, loading, error }] = useUpdateTaskMutation({
 *   variables: {
 *      isComplete: // value for 'isComplete'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUpdateTaskMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTaskMutation, UpdateTaskMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument, options);
      }
export type UpdateTaskMutationHookResult = ReturnType<typeof useUpdateTaskMutation>;
export type UpdateTaskMutationResult = Apollo.MutationResult<UpdateTaskMutation>;
export type UpdateTaskMutationOptions = Apollo.BaseMutationOptions<UpdateTaskMutation, UpdateTaskMutationVariables>;
export const GetUserDocument = gql`
    query getUser {
  getUser {
    id
    email
    username
    firstName
    lastName
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      email
      username
      firstName
      lastName
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!, $firstName: String!, $lastName: String!) {
  register(email: $email, password: $password, username: $username, firstName: $firstName, lastName: $lastName)
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SearchUsersDocument = gql`
    query searchUsers($search: String!) {
  searchUsers(search: $search) {
    id
    firstName
    lastName
    username
    email
  }
}
    `;

/**
 * __useSearchUsersQuery__
 *
 * To run a query within a React component, call `useSearchUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchUsersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchUsersQuery(baseOptions: Apollo.QueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
      }
export function useSearchUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchUsersQuery, SearchUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchUsersQuery, SearchUsersQueryVariables>(SearchUsersDocument, options);
        }
export type SearchUsersQueryHookResult = ReturnType<typeof useSearchUsersQuery>;
export type SearchUsersLazyQueryHookResult = ReturnType<typeof useSearchUsersLazyQuery>;
export type SearchUsersQueryResult = Apollo.QueryResult<SearchUsersQuery, SearchUsersQueryVariables>;
export const GetTeamMembersDocument = gql`
    query getTeamMembers($team: String!) {
  getTeamMembers(team: $team) {
    id
    firstName
    lastName
  }
}
    `;

/**
 * __useGetTeamMembersQuery__
 *
 * To run a query within a React component, call `useGetTeamMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamMembersQuery({
 *   variables: {
 *      team: // value for 'team'
 *   },
 * });
 */
export function useGetTeamMembersQuery(baseOptions: Apollo.QueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
      }
export function useGetTeamMembersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamMembersQuery, GetTeamMembersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamMembersQuery, GetTeamMembersQueryVariables>(GetTeamMembersDocument, options);
        }
export type GetTeamMembersQueryHookResult = ReturnType<typeof useGetTeamMembersQuery>;
export type GetTeamMembersLazyQueryHookResult = ReturnType<typeof useGetTeamMembersLazyQuery>;
export type GetTeamMembersQueryResult = Apollo.QueryResult<GetTeamMembersQuery, GetTeamMembersQueryVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: Apollo.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
      }
export function useUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, options);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = Apollo.QueryResult<UsersQuery, UsersQueryVariables>;