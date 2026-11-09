# 7mkennels.com

The site is in `public/`, one page per menu tab:

| Page | File |
|---|---|
| Home | `public/index.html` |
| The litter | `public/litter/index.html` |
| Bear and Nia | `public/parents/index.html` |
| Pickup | `public/pickup/index.html` |
| How it works | `public/how-it-works/index.html` |
| Inquire | `public/inquire/index.html` |

Every page shares `public/styles.css`. The menu and footer are repeated in each page, so change them in all six. Photos go in `public/images/`. The price appears on the home page and the litter page.

## The puppy list

Puppies are listed in `public/puppies.json`. While the list is empty, the page says photos and availability are coming soon. Each puppy looks like this:

```json
{
  "puppies": [
    { "name": "Cocoa", "sex": "Female", "status": "available", "photo": "images/cocoa.jpg", "note": "The smallest of the litter." }
  ]
}
```

- `status` is `available`, `reserved` or `sold`. A sold puppy stays on the page marked Sold; delete the entry to take it off.
- `photo` and `note` are optional.
