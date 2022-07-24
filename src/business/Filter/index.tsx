import { Image, Picker, View } from '@tarojs/components';
import { FC, Key, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { DropdownMenu } from '@taroify/core';
import "@taroify/core/dropdown-menu/style"

import Button from '@/components/Button';
import Input from '@/components/Inputs/Input';
import Radio from '@/components/Radio';

import IconPolygon from '@/assets/polygon.svg'

import { Option } from '@/types';

import './index.less';

export type FilterConfigItem = {
  id: number;
  name: string;
  type: 'single' | 'date-range-picker' | 'number-range';
  children?: Option[] | null;
  title?: string;
  transfer?: (value: any) => { [x:string]: any };
};

type Props = {
  filterConfig: FilterConfigItem[];
  filters: { [x: number]: any };
  onFilterChange: (id: number, value: any) => void;
};

const Title: FC<{
  item: { id: number; name: string };
  isActive: boolean;
  isFiltered: boolean;
  onClick: (id: number | undefined) => void;
}> = ({ item, isActive, isFiltered, onClick }) => {
  const className = `filter-item-title ${isActive || isFiltered ? 'filter-item-title-active' : ''}`;
  return (
    <View onClick={() => onClick(item.id)} className={className}>
      {item.name}
      <Image className='icon-polygon' src={IconPolygon} />
    </View>
  );
};

const Panel: FC<{
  title?: string;
  onReset?: () => void;
  onConfirm?: () => void;
  className?: string;
  confirmDisabled?: boolean;
}> = ({ title, children, onReset, onConfirm, className, confirmDisabled }) => {
  return (
    <View className={`dropdown-filter-panel ${className}`}>
      {title && <View className='dropdown-filter-panel-header'>{title}</View>}
      <View className='dropdown-filter-panel-content'>{children}</View>
      {onReset && onConfirm && <View className='dropdown-filter-panel-footer'>
        <Button className='dropdown-filter-panel-footer-btn' type='default' onClick={onReset}>
          重置
        </Button>
        <Button
          disabled={confirmDisabled}
          className='dropdown-filter-panel-footer-btn'
          type='primary'
          onClick={onConfirm}
        >
          完成
        </Button>
      </View>}
    </View>
  );
};

const SingleSelect = ({ options, value, onChange }) => {
  const handleClick = (id) => {
    if (id === value) {
      onChange(undefined)
    } else {
      onChange(id)
    }
  }
  return (
    <Panel>
      <Radio options={options} value={value} onChange={handleClick} />
    </Panel>
  )
}

const DateRangePicker: FC<{
  title: string;
  value: number[] | undefined;
  onChange: (value: number[] | undefined) => void;
}> = ({ title, onChange, value }) => {
  const start = dayjs().subtract(6, 'month').format('YYYY-MM-DD');

  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();

  useEffect(() => {
    if (value) {
      setStartTime(dayjs(value[0]).format('YYYY-MM-DD'));
      setEndTime(dayjs(value[1]).format('YYYY-MM-DD'));
    }
  }, [value]);

  const handleReset = () => {
    onChange(undefined);
    setStartTime(undefined);
    setEndTime(undefined);
  };
  const handleConfirm = () => {
    const startTimestamp = dayjs(startTime).valueOf();
    const endTimestamp = dayjs(endTime).add(1, 'day').subtract(1, 'second').valueOf(); // 取一天中的最后一秒
    onChange([startTimestamp, endTimestamp]);
  };
  const confirmDisabled = !startTime || !endTime;

  return (
    <Panel
      className='date-range-picker-panel'
      title={title}
      onReset={handleReset}
      onConfirm={handleConfirm}
      confirmDisabled={confirmDisabled}
    >
      <View className='date-range-picker'>
        <View className='date-range-picker-display'>
          <Picker mode='date' start={start} end={endTime} value={startTime || ''} onChange={(e) => setStartTime(e.detail.value)}>
            <View className={startTime ? 'display__main' : 'display__tip'}>{startTime || '开始时间'}</View>
          </Picker>
        </View>
        <View className='date-range-picker-mid'>至</View>
        <View className='date-range-picker-display'>
          <Picker mode='date' start={startTime || start} value={endTime || ''} onChange={(e) => setEndTime(e.detail.value)}>
            <View className={endTime ? 'display__main' : 'display__tip'}>{endTime || '结束时间'}</View>
          </Picker>
        </View>
      </View>
    </Panel>
  );
};

const NumberRange: FC<{
  title: string;
  value: number[] | undefined;
  onChange: (value: number[] | undefined) => void;
}> = ({ title, onChange, value }) =>{
  const [start, setStart] = useState<number>();
  const [end, setEnd] = useState<number>();
  
  useEffect(() => {
    if (value) {
      setStart(value[0]);
      setEnd(value[1]);
    }
  }, [value]);

  const handleReset = () => {
    onChange(undefined);
    setStart(undefined);
    setEnd(undefined);
  };
  const handleConfirm = () => {
    onChange([start!, end!]);
  };
  const confirmDisabled = !start || !end || start < 0 || start > end || end > 120;

  return (
    <Panel
      className='number-range-panel'
      title={title}
      onReset={handleReset}
      onConfirm={handleConfirm}
      confirmDisabled={confirmDisabled}
    >
      <View className='number-range'>
        <View className='number-range-display'>
          <Input placeholder='最小年龄' type='number' value={String(start || '')} onChange={(v) => setStart(+v)} />
        </View>
        <View className='number-range-mid'>至</View>
        <View className='number-range-display'>
          <Input placeholder='最大年龄' type='number' value={String(end || '')} onChange={(v) => setEnd(+v)} />
        </View>
      </View>
    </Panel>
  );
}

const Filter: FC<Props> = ({ filterConfig, onFilterChange, filters }) => {
  const [activeId, setActiveId] = useState<number>();
  const [showIdx, setShowIdx] = useState<Key | false>();

  useEffect(() => {
    showIdx !== 0 && !showIdx && setActiveId(undefined);
  }, [showIdx]);

  const onTitleClick = (id: number) => setActiveId(activeId === id ? undefined : id);

  const onChange = (id, value) => {
    onFilterChange(id, value);
    setShowIdx(false);
  };

  return (
    <View>
      <DropdownMenu value={showIdx} onChange={setShowIdx} className='filter-wrapper'>
        {filterConfig.map(item => (
          <DropdownMenu.Item
            key={item.id}
            title={
              <Title
                item={item}
                isActive={item.id === activeId}
                isFiltered={filters[item.id] !== undefined}
                onClick={onTitleClick}
              />
            }
            onChange={value => {
              onFilterChange(item.id, value);
            }}
            value={filters[item.id] || null}
          >
            {item.type === 'date-range-picker' && (
              <DateRangePicker
                title={item.title || item.name}
                value={filters[item.id]}
                onChange={value => onChange(item.id, value)}
              />
            )}
            {item.type === 'number-range' && (
              <NumberRange
                title={item.title || item.name}
                value={filters[item.id]}
                onChange={value => onChange(item.id, value)}
              />
            )}
            {item.type === 'single' && (
              <SingleSelect
                options={item.children || []}
                value={filters[item.id]}
                onChange={value => onChange(item.id, value)}
              />
            )}
          </DropdownMenu.Item>
        ))}
      </DropdownMenu>
    </View>
  );
};

export default Filter;