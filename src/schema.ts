/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type MessageInput = {
  _id: string,
  from: string,
  sent_date: string,
  message: string,
  status: string,
};

export type ProfileQueryQuery = {
  profile:  {
    user:  {
      _id: string,
      smallPhoto: string,
      formattedName: string,
    },
  } | null,
};

export type GetMatchQueryVariables = {
  id: string,
};

export type GetMatchQuery = {
  match:  {
    _id: string,
    person:  {
      _id: string,
      formattedName: string,
    },
  },
};

export type SendMessageMutationMutationVariables = {
  id: string,
  rawMessage: MessageInput,
};

export type SendMessageMutationMutation = {
  sendMessage:  {
    _id: string | null,
    from: string | null,
    first: boolean | null,
    firstInNewDay: boolean | null,
    sentDay: string | null,
    sentTime: string | null,
    sentDate: string | null,
    formattedMessage: string,
    status: string,
    isGIPHY: boolean | null,
    message: string | null,
  },
};

export type SendMessageInfoQueryVariables = {
  id: string,
};

export type SendMessageInfoQuery = {
  match:  {
    _id: string,
    lastMessage:  {
      _id: string | null,
      from: string | null,
      first: boolean | null,
      firstInNewDay: boolean | null,
      sentDay: string | null,
      sentTime: string | null,
      sentDate: string | null,
      formattedMessage: string,
      status: string,
      isGIPHY: boolean | null,
      message: string | null,
    },
    messages:  Array< {
      _id: string | null,
      from: string | null,
      first: boolean | null,
      firstInNewDay: boolean | null,
      sentDay: string | null,
      sentTime: string | null,
      sentDate: string | null,
      formattedMessage: string,
      status: string,
      isGIPHY: boolean | null,
      message: string | null,
    } > | null,
    lastActivityDate: string,
  },
  profile:  {
    user:  {
      _id: string,
    },
  } | null,
};

export type MatchesQueryQuery = {
  matches:  Array< {
    _id: string,
    lastMessage:  {
      formattedMessage: string,
      status: string,
      sentDay: string | null,
      _id: string | null,
    },
    lastActivityDate: string,
    person:  {
      _id: string,
      formattedName: string,
      smallPhoto: string,
    },
  } > | null,
};

export type ResendMessageMutationMutationVariables = {
  id: string,
  messageId: string,
};

export type ResendMessageMutationMutation = {
  resendMessage:  {
    _id: string | null,
    status: string,
  },
};

export type GetMatchWithMessagesQueryVariables = {
  id: string,
};

export type GetMatchWithMessagesQuery = {
  match:  {
    _id: string,
    person:  {
      _id: string,
      name: string,
      smallPhoto: string,
    },
    messages:  Array< {
      _id: string | null,
      from: string | null,
      first: boolean | null,
      firstInNewDay: boolean | null,
      sentDay: string | null,
      sentTime: string | null,
      sentDate: string | null,
      formattedMessage: string,
      status: string,
      isGIPHY: boolean | null,
      message: string | null,
    } > | null,
  },
  profile:  {
    user:  {
      _id: string,
      name: string,
      smallPhoto: string,
    },
  } | null,
};

export type UpdateProfileMutationMutation = {
  updateProfile:  {
    user:  {
      _id: string,
      formattedName: string,
      birthDate: string,
      formattedBio: string | null,
      galleryPhotos:  Array< {
        original: string,
      } >,
      smallPhoto: string,
      schools:  Array< {
        id: string,
        name: string,
      } > | null,
      distanceKm: number | null,
      jobs:  Array< {
        company:  {
          name: string,
        } | null,
        title:  {
          name: string,
        } | null,
      } > | null,
    },
  },
};

export type FullProfileQueryQuery = {
  profile:  {
    user:  {
      _id: string,
      formattedName: string,
      birthDate: string,
      formattedBio: string | null,
      galleryPhotos:  Array< {
        original: string,
      } >,
      smallPhoto: string,
      schools:  Array< {
        id: string,
        name: string,
      } > | null,
      distanceKm: number | null,
      jobs:  Array< {
        company:  {
          name: string,
        } | null,
        title:  {
          name: string,
        } | null,
      } > | null,
    },
  } | null,
};

export type GetUpdatedPersonInfoMutationVariables = {
  id: string,
};

export type GetUpdatedPersonInfoMutation = {
  updatePerson:  {
    _id: string,
    formattedName: string,
    birthDate: string,
    formattedBio: string | null,
    galleryPhotos:  Array< {
      original: string,
    } >,
    smallPhoto: string,
    schools:  Array< {
      id: string,
      name: string,
    } > | null,
    distanceKm: number | null,
    jobs:  Array< {
      company:  {
        name: string,
      } | null,
      title:  {
        name: string,
      } | null,
    } > | null,
    connectionCount: number | null,
    commonConnections:  Array< {
      id: string,
      name: string,
      photo:  {
        small: string,
      },
    } > | null,
    commonInterests:  Array< {
      id: string,
      name: string,
    } > | null,
  },
};

export type GetMatchInfoQueryVariables = {
  id: string,
};

export type GetMatchInfoQuery = {
  match:  {
    _id: string,
    isSuperLike: boolean,
    person:  {
      _id: string,
      formattedName: string,
      birthDate: string,
      formattedBio: string | null,
      galleryPhotos:  Array< {
        original: string,
      } >,
      smallPhoto: string,
      schools:  Array< {
        id: string,
        name: string,
      } > | null,
      distanceKm: number | null,
      jobs:  Array< {
        company:  {
          name: string,
        } | null,
        title:  {
          name: string,
        } | null,
      } > | null,
      connectionCount: number | null,
      commonConnections:  Array< {
        id: string,
        name: string,
        photo:  {
          small: string,
        },
      } > | null,
      commonInterests:  Array< {
        id: string,
        name: string,
      } > | null,
    },
  },
};

export type CheckDoMatchesExistAndFetchHistoryMutation = {
  checkDoMatchesExist: boolean,
};

export type GetFbQuery = {
  fb:  {
    id: string | null,
    token: string | null,
  },
};

export type LoginMutation = {
  login:  {
    status: string,
  },
};

export type LoginFbMutation = {
  loginFB:  {
    id: string | null,
    token: string | null,
  },
};

export type LogoutMutation = {
  logout:  {
    status: string,
  },
};

export type ShowWindowMutation = {
  showWindow:  {
    status: string,
  },
};

export type StartSubscriptionMutation = {
  subscribeToUpdates:  {
    status: string,
  },
};

export type LastMessageMatchFieldsFragment = {
  formattedMessage: string,
  status: string,
  sentDay: string | null,
  _id: string | null,
};

export type MessageStatusFragment = {
  __typename: string,
  status: string,
};

export type MessageListFieldsFragment = {
  _id: string | null,
  from: string | null,
  first: boolean | null,
  firstInNewDay: boolean | null,
  sentDay: string | null,
  sentTime: string | null,
  sentDate: string | null,
  formattedMessage: string,
  status: string,
  isGIPHY: boolean | null,
  message: string | null,
};

export type UserInfoFragment = {
  _id: string,
  formattedName: string,
  birthDate: string,
  formattedBio: string | null,
  galleryPhotos:  Array< {
    original: string,
  } >,
  smallPhoto: string,
  schools:  Array< {
    id: string,
    name: string,
  } > | null,
  distanceKm: number | null,
  jobs:  Array< {
    company:  {
      name: string,
    } | null,
    title:  {
      name: string,
    } | null,
  } > | null,
};

export type PersonInfoFragment = {
  _id: string,
  formattedName: string,
  birthDate: string,
  formattedBio: string | null,
  galleryPhotos:  Array< {
    original: string,
  } >,
  smallPhoto: string,
  schools:  Array< {
    id: string,
    name: string,
  } > | null,
  distanceKm: number | null,
  jobs:  Array< {
    company:  {
      name: string,
    } | null,
    title:  {
      name: string,
    } | null,
  } > | null,
  connectionCount: number | null,
  commonConnections:  Array< {
    id: string,
    name: string,
    photo:  {
      small: string,
    },
  } > | null,
  commonInterests:  Array< {
    id: string,
    name: string,
  } > | null,
};
/* tslint:enable */
