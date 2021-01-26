import { FC } from 'react'
import { Icon } from '@chakra-ui/react'
import { FaReddit, FaCoffee } from 'react-icons/fa'

type ArrowLeftIconProps = {
  size: number
  color: string
}

export const ArrowLeftIcon: FC<ArrowLeftIconProps> = ({ size, color }) => {
  return (
    <Icon
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
      />
    </Icon>
  )
}

type ArrowRightIconProps = {
  size: number
  color: string
}

export const ArrowRightIcon: FC<ArrowRightIconProps> = ({ size, color }) => {
  return (
    <Icon
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
      />
    </Icon>
  )
}

type RedditProps = {
  size: number
}

export const RedditIcon: FC<RedditProps> = ({ size }) => {
  return (
    <Icon
      as={FaReddit}
      aria-label="reddit icon"
      color="gray.600"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ml={2}
      viewBox="0 0 24 24"
      _hover={{ color: '#6366F1' }}
    />
  )
}

type CoffeeProps = {
  size: number
}

export const CoffeeIcon: FC<CoffeeProps> = ({ size }) => {
  return (
    <Icon
      as={FaCoffee}
      aria-label="buy me a coffee icon"
      color="gray.600"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      ml={2}
      viewBox="0 0 24 24"
      _hover={{ color: '#6366F1' }}
    />
  )
}

type TwitterIconProps = {
  size: number
}

export const TwitterIcon: FC<TwitterIconProps> = ({ size }) => {
  return (
    <Icon
      aria-label="twitter icon"
      color="gray.600"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      _hover={{ color: '#6366F1' }}
    >
      <path
        fill="currentColor"
        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
      />
    </Icon>
  )
}

type MailtoIconProps = {
  size: number
}

export const MailtoIcon: FC<MailtoIconProps> = ({ size }) => {
  return (
    <Icon
      aria-label="mail to icon"
      color="gray.600"
      cursor="pointer"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      _hover={{ color: '#6366F1' }}
    >
      <path
        fill="currentColor"
        d="M12 12.713l-11.985-9.713h23.971l-11.986 9.713zm-5.425-1.822l-6.575-5.329v12.501l6.575-7.172zm10.85 0l6.575 7.172v-12.501l-6.575 5.329zm-1.557 1.261l-3.868 3.135-3.868-3.135-8.11 8.848h23.956l-8.11-8.848z"
      />
    </Icon>
  )
}

type MapMarkerIconProps = {
  size: number
  color: string
}

export const MapMarkerIcon: FC<MapMarkerIconProps> = ({ size, color }) => {
  return (
    <Icon
      color={color}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-label="map marker"
    >
      <path
        fill="currentColor"
        d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
      />
    </Icon>
  )
}
