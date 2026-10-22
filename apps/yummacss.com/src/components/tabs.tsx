import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import type * as React from "react";
import { merge } from "yummacss/merge";

interface TabsProps extends React.ComponentProps<typeof BaseTabs.Root> {
  defaultValue?: string;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Tabs({
  children,
  defaultValue,
  className = "",
  style,
  ...props
}: TabsProps) {
  return (
    <BaseTabs.Root
      defaultValue={defaultValue}
      className={`bw:1 bc:border ${className}`}
      style={style}
      {...props}
    >
      {children}
    </BaseTabs.Root>
  );
}

interface TabsListProps extends React.ComponentProps<typeof BaseTabs.List> {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function TabsList({
  children,
  className = "",
  style,
  ...props
}: TabsListProps) {
  return (
    <BaseTabs.List
      className={merge(
        "d:f p:r zi:0 px:1 cg:1 bbw:1 bc:border ox:auto",
        className,
      )}
      style={style}
      {...props}
    >
      {children}
      <BaseTabs.Indicator
        className="p:a l:0 t:50% h:6 bc:border bg:surface bw:1 tdu:200 ttf:io"
        style={{
          zIndex: -1,
          translate: "var(--active-tab-left) -50%",
          width: "var(--active-tab-width)",
          transitionProperty: "translate, width",
        }}
      />
    </BaseTabs.List>
  );
}

interface TabsTabProps extends React.ComponentProps<typeof BaseTabs.Tab> {
  children: React.ReactNode;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TabsTab({
  children,
  value,
  className = "",
  style,
  ...props
}: TabsTabProps) {
  return (
    <BaseTabs.Tab
      value={value}
      className={`d:f ai:c jc:c bw:0 m:0 px:2 py:0 c:ink/80 fs:sm fw:500 us:none ws:nw h:8 a:none os:none bg:transparent ${className}`}
      style={{
        fontFamily: "inherit",
        ...style,
      }}
      {...props}
    >
      {children}
    </BaseTabs.Tab>
  );
}

interface TabsPanelProps extends React.ComponentProps<typeof BaseTabs.Panel> {
  children: React.ReactNode;
  value: string;
  className?: string;
  style?: React.CSSProperties;
}

export function TabsPanel({
  children,
  value,
  className = "p:4",
  style,
  ...props
}: TabsPanelProps) {
  return (
    <BaseTabs.Panel
      value={value}
      className={`p:r os:none ${className}`}
      style={style}
      {...props}
    >
      {children}
    </BaseTabs.Panel>
  );
}
