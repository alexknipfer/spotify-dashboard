import Nav from './Nav';

import { spotifyService } from '@/lib/spotify';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

export default async function NavContainer() {
  const profile = await spotifyService.getProfile();

  const smallestProfileImage = profile.images.length
    ? profile.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
    : null;

  return (
    <div className="flex items-center justify-between h-16 sticky top-0 px-16">
      <Nav />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={smallestProfileImage ? smallestProfileImage.url : ''}
                alt="Spotify profile image"
              />
              <AvatarFallback className="text-zinc-50">
                {profile.display_name.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 py-1" align="end">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {profile.display_name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {profile.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button className="w-full text-left">Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
