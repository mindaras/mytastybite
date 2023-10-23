"use client";

import React, { useState } from "react";
import styles from "./Tabs.module.scss";
import classNames from "classnames";

export interface TabAttributes {
  name: string;
}

interface TabsProps {
  children: React.ReactNode;
  active?: string;
  center?: boolean;
  expand?: boolean;
  fullWidth?: boolean;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  children,
  active,
  center,
  expand,
  fullWidth,
  className,
}) => {
  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<TabAttributes>[];
  const [activeTab, setActiveTab] = useState(active || tabs[0].props.name);
  const names = tabs.map((tab) => tab.props.name);
  const activeChild =
    tabs.find((tab) => tab.props.name === activeTab) || tabs[0];

  return (
    <div
      className={classNames(
        styles.container,
        {
          [styles.container__center]: center,
          [styles.container__fullWidth]: fullWidth,
        },
        className
      )}
    >
      <div
        className={classNames(styles.tabs, { [styles.tabs__expand]: expand })}
      >
        <div className={styles.buttons}>
          {names.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => setActiveTab(name)}
              className={classNames(styles.button, {
                [styles.button__active]: name === activeTab,
              })}
            >
              {name}
            </button>
          ))}
        </div>
        <div className={styles.content}>{activeChild}</div>
      </div>
    </div>
  );
};

interface TabProps extends TabAttributes {
  children: React.ReactNode;
}

const Tab: React.FC<TabProps> = ({ children }) => {
  return <>{children}</>;
};

export { Tabs, Tab };
