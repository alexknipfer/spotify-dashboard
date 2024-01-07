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
import { spotifyService } from '@/lib/spotify';

export default async function NavProfileMenu() {
  const profile = await spotifyService.getProfile();

  const smallestProfileImage = profile.images.length
    ? profile.images.reduce((prev, curr) =>
        prev.height < curr.height ? prev : curr,
      )
    : null;

  return (
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
      <DropdownMenuContent className="w-56 py-2" align="end">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {profile.display_name}
            </p>
            <p className="text-xs leading-none text-zinc-500">
              {profile.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-2">
          <Button variant="logout" size="logout" className="w-full text-left">
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
