import React from "react";

const initialState = {
  helloMessageSeen: false,
};

const contextWrapper = (component?: React.Component) => ({
  ...initialState,

  setHelloMessageSeen: (isSeen: boolean) => {
    initialState.helloMessageSeen = isSeen;
    component?.setState({ context: contextWrapper(component) });
  },
});

type ContextType = ReturnType<typeof contextWrapper>;

export const Context = React.createContext<ContextType>(contextWrapper());

interface State {
  context: ContextType;
}
interface ContextProviderProps {
  children?: React.ReactNode;
}

export class ContextProvider extends React.Component<ContextProviderProps> {
  state: State = {
    context: contextWrapper(this),
  };

  render() {
    return (
      <Context.Provider value={this.state.context}>
        {this.props?.children}
      </Context.Provider>
    );
  }
}
