"""
Regex for RFC7232

These regex are directly derived from the collected ABNF in RFC7232.

  <http://httpwg.org/specs/rfc7232.html#collected.abnf>

They should be processed with re.VERBOSE.
"""

from rfc5234 import DQUOTE
from rfc7230 import list_rule, OWS, obs_text
from rfc7231 import HTTP_date


# weak = %x57.2F ; W/

weak = r"(?: \x57\x2F )"

# etagc = "!" / %x23-7E ; '#'-'~' / obs-text

etagc = r"(?: ! | [\x23-\x7E] | {obs_text} )".format(**locals())

# opaque-tag = DQUOTE *etagc DQUOTE

opaque_tag = r"(?: {DQUOTE} {etagc}* {DQUOTE} )".format(**locals())

# entity-tag = [ weak ] opaque-tag

entity_tag = r"(?: {weak}? {opaque_tag} )".format(**locals())

# ETag = entity-tag

ETag = entity_tag
 
# If-Match = "*" / 1#entity-tag

If_Match = r"(?: \* | %s )" % list_rule(entity_tag, 1)

# If-Modified-Since = HTTP-date

If_Modified_Since = HTTP_date

# If-None-Match = "*" / 1#entity-tag

If_None_Match = r"(?: \* | %s )" % list_rule(entity_tag, 1)

# If-Unmodified-Since = HTTP-date
 
If_Unmodified_Since = HTTP_date
  
# Last-Modified = HTTP-date

Last_Modified = HTTP_date