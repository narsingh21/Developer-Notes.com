import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tab } from '@/types/common';

interface TabsProps {
  tabsList: Tab[];
  variant?: string;
  defaultTab: string;
}

export function TabsDemo({
  defaultTab,
  variant = 'line',
  tabsList,
}: TabsProps) {
  return (
    <Tabs
      defaultValue={defaultTab ? defaultTab : tabsList[0].name}
      className='w-[400px]'
    >
      <TabsList>
        {tabsList.map((tab) => (
          <TabsTrigger key={tab.name} value={tab.name} disabled={tab.disable}>
            {tab.icon && <tab.icon />}
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabsList.map((tab) => (
        <TabsContent key={tab.name} value={tab.name}>
          {tab.component ? (
            <tab.component />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{tab.name}</CardTitle>
                <CardDescription>
                 {tab.description}
                </CardDescription>
              </CardHeader>
              <CardContent className='text-sm text-muted-foreground'>
                You have 12 active projects and 3 pending tasks.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
