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
  getProjectTeams: Array<Teams>;
  getTeam: Teams;
  getTeamMembers: Array<Users>;
  getTeamProjects: Array<Projects>;
  getUser?: Maybe<Users>;
  getUsersProjects: Array<Projects>;
  getUsersTeams: Array<Teams>;
  searchTeams: Array<Teams>;
  searchUsers: Array<Users>;
  teams: Array<Teams>;
  users: Array<Users>;
};


export type QueryGetProjectArgs = {
  id: Scalars['Float'];
};


export type QueryGetProjectTeamsArgs = {
  teams: Scalars['String'];
};


export type QueryGetTeamArgs = {
  id: Scalars['Float'];
};


export type QueryGetTeamMembersArgs = {
  team: Scalars['String'];
};


export type QueryGetTeamProjectsArgs = {
  id: Scalars['Float'];
};


export type QueryGetUsersProjectsArgs = {
  id: Scalars['Float'];
};


export type QueryGetUsersTeamsArgs = {
  id: Scalars['Float'];
};


export type QuerySearchTeamsArgs = {
  search: Scalars['String'];
};


export type QuerySearchUsersArgs = {
  search: Scalars['String'];
};

export type Projects = {
  __typename?: 'Projects';
  created: Scalars['String'];
  id: Scalars['Int'];
  projectLead: Scalars['Int'];
  projectName: Scalars['String'];
  teams: Scalars['String'];
};

export type Teams = {
  __typename?: 'Teams';
  created: Scalars['String'];
  id: Scalars['Int'];
  members: Scalars['String'];
  teamLead: Scalars['Int'];
  teamName: Scalars['String'];
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
  createTeam: Scalars['Boolean'];
  deleteProject: Scalars['Boolean'];
  deleteTeam: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: Scalars['Boolean'];
  revokeRefreshTokensForUser: Scalars['Boolean'];
  updateProject: Projects;
  updateTeam: Teams;
};


export type MutationCreateProjectArgs = {
  projectLead: Scalars['Float'];
  projectName: Scalars['String'];
  teams: Scalars['String'];
};


export type MutationCreateTeamArgs = {
  members: Scalars['String'];
  teamLead: Scalars['Float'];
  teamName: Scalars['String'];
};


export type MutationDeleteProjectArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteTeamArgs = {
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


export type MutationUpdateProjectArgs = {
  id: Scalars['Float'];
  tasks: Scalars['String'];
};


export type MutationUpdateTeamArgs = {
  id: Scalars['Float'];
  members: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: Users;
};

export type CreateProjectMutationVariables = Exact<{
  teams: Scalars['String'];
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


export type GetProjectQuery = { __typename?: 'Query', getProject: { __typename?: 'Projects', projectName: string, projectLead: number, teams: string } };

export type GetTeamProjectQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTeamProjectQuery = { __typename?: 'Query', getTeamProjects: Array<{ __typename?: 'Projects', id: number, projectName: string, projectLead: number, created: string }> };

export type GetUsersProjectsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUsersProjectsQuery = { __typename?: 'Query', getUsersProjects: Array<{ __typename?: 'Projects', id: number, projectName: string, projectLead: number, created: string, teams: string }> };

export type CreateTeamMutationVariables = Exact<{
  members: Scalars['String'];
  teamName: Scalars['String'];
  teamLead: Scalars['Float'];
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam: boolean };

export type DeleteTeamMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteTeamMutation = { __typename?: 'Mutation', deleteTeam: boolean };

export type GetProjectTeamsQueryVariables = Exact<{
  teams: Scalars['String'];
}>;


export type GetProjectTeamsQuery = { __typename?: 'Query', getProjectTeams: Array<{ __typename?: 'Teams', teamLead: number, teamName: string, id: number, members: string, created: string }> };

export type GetTeamQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetTeamQuery = { __typename?: 'Query', getTeam: { __typename?: 'Teams', teamName: string, teamLead: number, members: string } };

export type GetTeamMembersQueryVariables = Exact<{
  team: Scalars['String'];
}>;


export type GetTeamMembersQuery = { __typename?: 'Query', getTeamMembers: Array<{ __typename?: 'Users', firstName: string, lastName: string, email: string, id: number }> };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Teams', id: number, members: string, teamLead: number, teamName: string }> };

export type GetUsersTeamsQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetUsersTeamsQuery = { __typename?: 'Query', getUsersTeams: Array<{ __typename?: 'Teams', id: number, teamName: string, teamLead: number, members: string, created: string }> };

export type SearchTeamsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type SearchTeamsQuery = { __typename?: 'Query', searchTeams: Array<{ __typename?: 'Teams', id: number, teamName: string, teamLead: number, members: string, created: string }> };

export type UpdateTeamMutationVariables = Exact<{
  members: Scalars['String'];
  updateTeamId: Scalars['Float'];
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam: { __typename?: 'Teams', members: string } };

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

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'Users', id: number }> };


export const CreateProjectDocument = gql`
    mutation createProject($teams: String!, $projectName: String!, $projectLead: Float!) {
  createProject(teams: $teams, projectName: $projectName, projectLead: $projectLead)
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
 *      teams: // value for 'teams'
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
    teams
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
export const GetTeamProjectDocument = gql`
    query getTeamProject($id: Float!) {
  getTeamProjects(id: $id) {
    id
    projectName
    projectLead
    created
  }
}
    `;

/**
 * __useGetTeamProjectQuery__
 *
 * To run a query within a React component, call `useGetTeamProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamProjectQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTeamProjectQuery(baseOptions: Apollo.QueryHookOptions<GetTeamProjectQuery, GetTeamProjectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamProjectQuery, GetTeamProjectQueryVariables>(GetTeamProjectDocument, options);
      }
export function useGetTeamProjectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamProjectQuery, GetTeamProjectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamProjectQuery, GetTeamProjectQueryVariables>(GetTeamProjectDocument, options);
        }
export type GetTeamProjectQueryHookResult = ReturnType<typeof useGetTeamProjectQuery>;
export type GetTeamProjectLazyQueryHookResult = ReturnType<typeof useGetTeamProjectLazyQuery>;
export type GetTeamProjectQueryResult = Apollo.QueryResult<GetTeamProjectQuery, GetTeamProjectQueryVariables>;
export const GetUsersProjectsDocument = gql`
    query getUsersProjects($id: Float!) {
  getUsersProjects(id: $id) {
    id
    projectName
    projectLead
    created
    teams
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
export const CreateTeamDocument = gql`
    mutation createTeam($members: String!, $teamName: String!, $teamLead: Float!) {
  createTeam(members: $members, teamName: $teamName, teamLead: $teamLead)
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      members: // value for 'members'
 *      teamName: // value for 'teamName'
 *      teamLead: // value for 'teamLead'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const DeleteTeamDocument = gql`
    mutation deleteTeam($id: Float!) {
  deleteTeam(id: $id)
}
    `;
export type DeleteTeamMutationFn = Apollo.MutationFunction<DeleteTeamMutation, DeleteTeamMutationVariables>;

/**
 * __useDeleteTeamMutation__
 *
 * To run a mutation, you first call `useDeleteTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteTeamMutation, { data, loading, error }] = useDeleteTeamMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteTeamMutation(baseOptions?: Apollo.MutationHookOptions<DeleteTeamMutation, DeleteTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteTeamMutation, DeleteTeamMutationVariables>(DeleteTeamDocument, options);
      }
export type DeleteTeamMutationHookResult = ReturnType<typeof useDeleteTeamMutation>;
export type DeleteTeamMutationResult = Apollo.MutationResult<DeleteTeamMutation>;
export type DeleteTeamMutationOptions = Apollo.BaseMutationOptions<DeleteTeamMutation, DeleteTeamMutationVariables>;
export const GetProjectTeamsDocument = gql`
    query getProjectTeams($teams: String!) {
  getProjectTeams(teams: $teams) {
    teamLead
    teamName
    id
    members
    created
  }
}
    `;

/**
 * __useGetProjectTeamsQuery__
 *
 * To run a query within a React component, call `useGetProjectTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProjectTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProjectTeamsQuery({
 *   variables: {
 *      teams: // value for 'teams'
 *   },
 * });
 */
export function useGetProjectTeamsQuery(baseOptions: Apollo.QueryHookOptions<GetProjectTeamsQuery, GetProjectTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProjectTeamsQuery, GetProjectTeamsQueryVariables>(GetProjectTeamsDocument, options);
      }
export function useGetProjectTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProjectTeamsQuery, GetProjectTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProjectTeamsQuery, GetProjectTeamsQueryVariables>(GetProjectTeamsDocument, options);
        }
export type GetProjectTeamsQueryHookResult = ReturnType<typeof useGetProjectTeamsQuery>;
export type GetProjectTeamsLazyQueryHookResult = ReturnType<typeof useGetProjectTeamsLazyQuery>;
export type GetProjectTeamsQueryResult = Apollo.QueryResult<GetProjectTeamsQuery, GetProjectTeamsQueryVariables>;
export const GetTeamDocument = gql`
    query getTeam($id: Float!) {
  getTeam(id: $id) {
    teamName
    teamLead
    members
  }
}
    `;

/**
 * __useGetTeamQuery__
 *
 * To run a query within a React component, call `useGetTeamQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetTeamQuery(baseOptions: Apollo.QueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
      }
export function useGetTeamLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamQuery, GetTeamQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamQuery, GetTeamQueryVariables>(GetTeamDocument, options);
        }
export type GetTeamQueryHookResult = ReturnType<typeof useGetTeamQuery>;
export type GetTeamLazyQueryHookResult = ReturnType<typeof useGetTeamLazyQuery>;
export type GetTeamQueryResult = Apollo.QueryResult<GetTeamQuery, GetTeamQueryVariables>;
export const GetTeamMembersDocument = gql`
    query getTeamMembers($team: String!) {
  getTeamMembers(team: $team) {
    firstName
    lastName
    email
    id
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
export const GetTeamsDocument = gql`
    query getTeams {
  teams {
    id
    members
    teamLead
    teamName
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetUsersTeamsDocument = gql`
    query getUsersTeams($id: Float!) {
  getUsersTeams(id: $id) {
    id
    teamName
    teamLead
    members
    created
  }
}
    `;

/**
 * __useGetUsersTeamsQuery__
 *
 * To run a query within a React component, call `useGetUsersTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersTeamsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUsersTeamsQuery(baseOptions: Apollo.QueryHookOptions<GetUsersTeamsQuery, GetUsersTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersTeamsQuery, GetUsersTeamsQueryVariables>(GetUsersTeamsDocument, options);
      }
export function useGetUsersTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersTeamsQuery, GetUsersTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersTeamsQuery, GetUsersTeamsQueryVariables>(GetUsersTeamsDocument, options);
        }
export type GetUsersTeamsQueryHookResult = ReturnType<typeof useGetUsersTeamsQuery>;
export type GetUsersTeamsLazyQueryHookResult = ReturnType<typeof useGetUsersTeamsLazyQuery>;
export type GetUsersTeamsQueryResult = Apollo.QueryResult<GetUsersTeamsQuery, GetUsersTeamsQueryVariables>;
export const SearchTeamsDocument = gql`
    query searchTeams($search: String!) {
  searchTeams(search: $search) {
    id
    teamName
    teamLead
    members
    created
  }
}
    `;

/**
 * __useSearchTeamsQuery__
 *
 * To run a query within a React component, call `useSearchTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchTeamsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchTeamsQuery(baseOptions: Apollo.QueryHookOptions<SearchTeamsQuery, SearchTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchTeamsQuery, SearchTeamsQueryVariables>(SearchTeamsDocument, options);
      }
export function useSearchTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchTeamsQuery, SearchTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchTeamsQuery, SearchTeamsQueryVariables>(SearchTeamsDocument, options);
        }
export type SearchTeamsQueryHookResult = ReturnType<typeof useSearchTeamsQuery>;
export type SearchTeamsLazyQueryHookResult = ReturnType<typeof useSearchTeamsLazyQuery>;
export type SearchTeamsQueryResult = Apollo.QueryResult<SearchTeamsQuery, SearchTeamsQueryVariables>;
export const UpdateTeamDocument = gql`
    mutation updateTeam($members: String!, $updateTeamId: Float!) {
  updateTeam(members: $members, id: $updateTeamId) {
    members
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      members: // value for 'members'
 *      updateTeamId: // value for 'updateTeamId'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
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