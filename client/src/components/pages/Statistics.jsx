import React from 'react';
import {ResponsivePie} from "@nivo/pie";
import {ResponsiveRadar} from '@nivo/radar'
import "../../css/statistics.scss"
import {useSelector} from "react-redux";
import {useMerger} from "../hooks/useMerger";

const Statistics = () => {
  const lists = useSelector(state => state.lists.lists)
  const tasks = useSelector(state => state.tasks.tasks)
  const mergedData = useMerger(lists, tasks, "tasks", "listId", "_id")

  const pieData = mergedData.map(obj => {
    return {id: obj.name, label: obj.name, value: obj.tasks.length}
  })
  const radarData = mergedData.map(obj => {
    return {
      "name": obj.name,
      "Выполненные": obj.tasks.filter(t => t.status === "ready_tasks").length,
      "В процессе": obj.tasks.filter(t => t.status === "process_tasks").length,
      "План": obj.tasks.filter(t => t.status === "plan_tasks").length,
    }
  })
  return (
    <div className="stats">
      <h1>Статистика</h1>
      {
        (lists.length === 0 && tasks.length === 0) ?
          <h3>Задачи отсутствуют</h3>
          : <>
            <div className="stats__container">
              <h3 className="stats__container-title">Количество задач в списках</h3>
              <ResponsivePie
                data={pieData}
                margin={{top: 40, right: 80, bottom: 80, left: 80}}
                endAngle={-360}
                innerRadius={0.5}
                padAngle={3}
                cornerRadius={1}
                activeOuterRadiusOffset={8}
                colors={{scheme: 'category10'}}
                borderWidth={1}
                borderColor={{from: 'color', modifiers: [['darker', 0.2]]}}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{from: 'color'}}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{from: 'color', modifiers: [['darker', 2]]}}
                legends={[
                  {
                    anchor: 'bottom',
                    direction: 'row',
                    justify: false,
                    translateX: 0,
                    translateY: 56,
                    itemsSpacing: 0,
                    itemWidth: 100,
                    itemHeight: 18,
                    itemTextColor: '#999',
                    itemDirection: 'left-to-right',
                    itemOpacity: 1,
                    symbolSize: 18,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>
            <div className="stats__container">
              <h3>Статусы по задачам</h3>
              <ResponsiveRadar
                data={radarData}
                keys={['План', 'В процессе', 'Выполненные']}
                indexBy="name"
                valueFormat=">-.2f"
                margin={{top: 70, right: 80, bottom: 40, left: 80}}
                borderColor={{from: 'color'}}
                gridLabelOffset={36}
                dotSize={5}
                dotColor={{theme: 'background'}}
                dotBorderWidth={2}
                colors={{scheme: 'nivo'}}
                motionConfig="wobbly"
                legends={[
                  {
                    anchor: 'top-left',
                    direction: 'column',
                    translateX: -50,
                    translateY: -40,
                    itemWidth: 80,
                    itemHeight: 20,
                    itemTextColor: '#999',
                    symbolSize: 12,
                    symbolShape: 'circle',
                    effects: [
                      {
                        on: 'hover',
                        style: {
                          itemTextColor: '#000'
                        }
                      }
                    ]
                  }
                ]}
              />
            </div>
          </>
      }
    </div>
  );
};

export default Statistics;