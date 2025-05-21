import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { AutoComplete, DataSourceType } from './autoComplete'
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const meta = {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    layout: 'centered',
    docs: {
      source: {
        type: "code",
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'lg'],
      description: 'Size of the input component'
    }
  },
  args: {
    size: 'sm' // Set small size as default
  },
  tags: ['autodocs'],
  // argTypes: { onClick: { action: 'clicked' }, onSelect: { action: 'selected' }, onChange: { action: 'changed' } },
} satisfies Meta<typeof AutoComplete>

export default meta

type Story = StoryObj<typeof meta>

// const Template: ComponentStory<typeof AutoComplete> = (args) => <AutoComplete {...args} />
// export const Simple = Template.bind({})
// const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
// 'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
// const handleFetch = (query: string) => {
//   return lakers.filter(name => name.includes(query)).map(name => ({value: name}))
// }
// Simple.args = {
//   fetchSuggestions: handleFetch,
//   placeholder: "Try typing a Lakers player name"
// }
export const SimpleComplete: Story = {
  args: {
    placeholder: "Enter Lakers player name",
    fetchSuggestions: () => []
  },
  render: (args) => {
    const lakers = ['bradley', 'pope', 'caruso', 'cook', 'cousins',
      'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando']
    const handleFetch = (query: string) => {
      return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
    }
    return (
      <AutoComplete
        {...args}
        fetchSuggestions={handleFetch}
      />
    )
  }
}
// Story names are now defined by the export name

export const BCustomComplete = (args) => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ]
  const handleFetch = (query: string) => {
    return lakersWithNumber.filter(player => player.value.includes(query))
  }
  const renderOption = (item: DataSourceType) => {
    const itemWithNumber = item as DataSourceType<LakerPlayerProps>
    return (
      <>
        <b>Name: {itemWithNumber.value}</b>
        <span>Jersey Number: {itemWithNumber.number}</span>
      </>
    )
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="Enter Lakers player name, custom dropdown template"
      renderOption={renderOption}
    />
  )
}
BCustomComplete.storyName = '2 Custom Search Results Template'

export const CAjaxComplete = (args) => {
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => {
        return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }))
      })
  }

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>
    return (
      <>
        <b>Name: {itemWithGithub.value}</b>
        <span>url: {itemWithGithub.url}</span>
      </>
    )
  }
  return (
    <AutoComplete
      {...args}
      fetchSuggestions={handleFetch}
      placeholder="Try typing a Github username"
      renderOption={renderOption}
    />
  )
}
CAjaxComplete.storyName = '3 Support Async Search'

// storiesOf('Chapter 9: AutoComplete', module)
//   .add('AutoComplete', simpleComplete, {info: {source: false, text: textComplete}})
//   .add('Custom Dropdown Options', customComplete,  {info: {source: false, text: textCustom}})
//   .add('Async Request Github Username', ajaxComplete, {info: {source: false, text: textAjax}})